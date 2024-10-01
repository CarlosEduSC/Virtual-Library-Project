package library.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import library.domain.user.AutenticationData;
import library.domain.user.User;
import library.domain.user.UserRepository;
import library.infra.Error.ErrorData;
import library.infra.security.TokenService;

@RestController
@RequestMapping("/login")
public class AutenticationController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @SuppressWarnings("rawtypes")
    @PostMapping
    public ResponseEntity LogIn(@Valid @RequestBody AutenticationData data) {
        var user = repository.findByEmail(data.email());

        String title = "Erro ao tentar fazer login!";

        if (user == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorData(title,"E-mail inválido ou usuário não cadastrado."));
        }

        if (!user.getActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorData(title,"Usuário está com a conta desativada."));
        }

        if (!passwordEncoder.matches(data.password(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ErrorData(title,"Senha inválida."));
        }

        var autenticationToken = new UsernamePasswordAuthenticationToken(data.email(), data.password(), user.getAuthorities());

        try {
            var autentication = manager.authenticate(autenticationToken);
            var tokenJWT = tokenService.tokenGenerator((User) autentication.getPrincipal());
            return ResponseEntity.ok(tokenJWT.replace("Baerer ", ""));
        
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorData(title, "Erro interno ao processar a solicitação."));
        }
    }
}
