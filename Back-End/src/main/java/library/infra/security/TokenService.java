package library.infra.security;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import library.domain.user.User;
import library.domain.user.UserRepository;

@Service
public class TokenService {

    @Value("JWT_SECRET")
    private String secret;

    @Autowired
    private UserRepository repository;

    public String tokenGenerator(User user) {
        try {
            var algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("Virtual Library")
                    .withSubject(user.getUsername())
                    .withClaim("id", user.getId())
                    .withClaim("type", user.getType().toString())
                    .withExpiresAt(expireDate())
                    .sign(algorithm);

        } catch (JWTCreationException e) {
            throw new RuntimeException("Erro ao gerar Token: ", e);
        }
    }

    public String getSubject(String tokenJWT) {
        try {

            if (isTokenValid(tokenJWT)) {
                var algorithm = Algorithm.HMAC256(secret);

                var decodedJWT = JWT.require(algorithm)
                        .withIssuer("Virtual Library")
                        .build()
                        .verify(tokenJWT);

                String userEmail = decodedJWT.getSubject();

                var user = repository.findByEmail(userEmail);

                if (user.getActive() == false && repository.existsById(user.getId())) {
                    throw new RuntimeException("Usuário não existe ou está com a conta desativada!");
                }

                return user.getEmail();
            } else {
                return "";
            }

        } catch (JWTVerificationException e) {
            throw new RuntimeException("Token JWT inválido ou expirado: ", e);
        }
    }

    public boolean isTokenValid(String tokenJWT) {
        try {
            var algorithm = Algorithm.HMAC256(secret);
            JWT.require(algorithm)
                    .withIssuer("Virtual Library")
                    .build()
                    .verify(tokenJWT);
            return true;
        } catch (JWTVerificationException e) {
            return false;
        }
    }

    private Instant expireDate() {
        return LocalDateTime.now().plusDays(1).toInstant(ZoneOffset.of("-03:00"));
    }
}