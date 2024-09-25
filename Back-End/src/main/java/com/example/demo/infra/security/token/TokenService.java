package com.example.demo.infra.security.token;

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
import com.example.demo.domain.usuario.Usuario;
import com.example.demo.domain.usuario.UsuarioRepository;


@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;

    @Autowired
    private UsuarioRepository repository;

    public String tokenGenerator(Usuario usuario) {
        try {
            var algorithm = Algorithm.HMAC256(secret);

            return JWT.create()
                    .withIssuer("Virtual Library")
                    .withSubject(usuario.getUsername())
                    .withClaim("id", usuario.getId())
                    .withClaim("tipo", usuario.getTipo().toString())
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

                var usuario = repository.findByEmail(userEmail);

                if (usuario.getStatus() == false && repository.existsById(usuario.getId())) {
                    throw new RuntimeException("Usuário não existe ou está com a conta desativada!");
                }

                return usuario.getEmail();
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