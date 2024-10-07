package library.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import library.domain.user.CreateUserData;
import library.domain.user.UpdateUserData;
import library.domain.user.ShowUserData;
import library.domain.user.User;
import library.domain.user.UserRepository;
import library.infra.AlertData;
import library.infra.security.TokenService;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repository;

    @Autowired
    TokenService tokenService;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/create")
    public ResponseEntity createUser(@Valid @RequestBody CreateUserData data,
            UriComponentsBuilder uriBuilder) {
        String errorTitle = errorTitleGenerate("cadastrar o usuario");

        if (repository.existsByEmail(data.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AlertData(errorTitle, "Email já está em uso."));
        }

        try {
            var user = new User(data);

            repository.save(user);

            var uri = uriBuilder.path("/user/create/{id}").buildAndExpand(user.getId()).toUri();

            return ResponseEntity.created(uri).body(new AlertData("Usuário criado com sucesso!",
                    "O novo usuário foi cadastrado com sucesso e agora pode acessar o sistema."));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all")
    public ResponseEntity findAllUsers() {
        String errorTitle = errorTitleGenerate("buscar todos os usuarios");

        try {
            var users = repository.findAll();

            return ResponseEntity.ok(mapUsers(users));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-active")
    public ResponseEntity findAllUsersActive() {
        String errorTitle = errorTitleGenerate("buscar os usuarios com a conta ativa");

        try {
            var users = repository.findAllByActive(true);

            return ResponseEntity.ok(mapUsers(users));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-inactive")
    public ResponseEntity findAllUsersInactive() {
        String errorTitle = errorTitleGenerate("buscar os usuarios com a conta inativa");

        try {
            var users = repository.findAllByActive(false);

            return ResponseEntity.ok(mapUsers(users));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-admins")
    public ResponseEntity findAllAdmins() {
        String errorTitle = errorTitleGenerate("buscar os usuarios do tipo administrador");

        try {
            var users = repository.findAllByType("ADMIN");

            return ResponseEntity.ok(mapUsers(users));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-readers")
    public ResponseEntity findAllReaders() {
        String errorTitle = errorTitleGenerate("buscar os usuarios do tipo leitor");

        try {
            var users = repository.findAllByType("READER");

            return ResponseEntity.ok(mapUsers(users));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find/{id}")
    public ResponseEntity findUserById(@PathVariable String id) {
        String errorTitle = errorTitleGenerate("buscar o usuario");

        try {
            Optional<User> optionalUser = repository.findById(id);

            if (optionalUser.isPresent()) {
                return ResponseEntity.ok(new ShowUserData(optionalUser.get()));

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Usuario não encontrado."));
            }
        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @PutMapping("/update")
    public ResponseEntity updateUser(@Valid @RequestBody UpdateUserData data) {
        String errorTitle = errorTitleGenerate("atualizar os dados do usuario");

        try {
            Optional<User> optionalUser = repository.findById(data.id());

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Usuario não encontrado."));
            }

            var user = optionalUser.get();

            user.updateUser(data);

            repository.save(user);

            return ResponseEntity.ok(new AlertData("Usuário atualizado com sucesso!",
                    "Os dados do usuário foram atualizados com sucesso."));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @DeleteMapping("/delete/{id}")
    @Transactional
    public ResponseEntity deleteUser(@PathVariable String id) {
        String errorTitle = errorTitleGenerate("deletar o usuario");

        try {
            if (!repository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Usuario não encontrado."));

            }

            repository.deleteById(id);

            return ResponseEntity.ok()
                    .body(new AlertData("Usuario deletado!", "O usuario foi deletado com sucesso."));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @DeleteMapping("/deactivate-account/{id}")
    public ResponseEntity deactivateUserAccount(@PathVariable String id) {
        return changeUserActive(id, false);
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("/reactivate-account/{id}")
    public ResponseEntity reactivateUserAccount(@PathVariable String id) {
        return changeUserActive(id, true);
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/verify-user")
    public ResponseEntity verifyUser(HttpServletRequest request) {
        String token = "";

        String errorTitle = "Erro ao verificar autenticação!";

        if (request.getHeader("Authorization") != null) {
            token = request.getHeader("Authorization").replace("Bearer ", "");

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AlertData(errorTitle, "Token de autorização ausente."));
        }

        String userEmail = tokenService.getSubject(token);

        if (userEmail == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AlertData(errorTitle, "Token inválido ou vazio."));
        }

        var user = repository.findByEmail(userEmail);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new AlertData(errorTitle, "Usuário não encontrado."));
        }

        if (!user.getActive()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new AlertData(errorTitle, "Usuário está com a conta desativada."));
        }

        return ResponseEntity.noContent().build();
    }

    public String errorTitleGenerate(String text) {
        return "Erro ao tentar " + text + "!";
    }

    @SuppressWarnings("rawtypes")
    public ResponseEntity handleError(String title, Exception e) {
        if (e instanceof DataAccessException) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(title, "Ocorreu um erro ao acessar o banco de dados."));

        } else if (e instanceof ConstraintViolationException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AlertData(title, "Violação de integridade dos dados ao tentar salvar o usuário."));

        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(title, "Ocorreu um erro inesperado no servidor."));
        }
    }

    public List<ShowUserData> mapUsers(List<User> users) {
        List<ShowUserData> usersData = new ArrayList<ShowUserData>();

        for (User user : users) {
            usersData.add(new ShowUserData(user));
        }

        return usersData;
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    public ResponseEntity changeUserActive(@PathVariable String id, boolean active) {
        String errorTitle = errorTitleGenerate((active ? "reativar" : "desativar") + " a conta do usuario");

        try {
            Optional<User> optionalUser = repository.findById(id);

            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Usuario não encontrado."));

            }

            var user = optionalUser.get();

            if (user.getActive() == active) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(new AlertData(errorTitle,
                                "A conta do usuario já está " + (active ? "ativa" : "desativada") + "."));

            } else {
                user.setActive(active);

                repository.save(user);

                return ResponseEntity.ok().body(new AlertData("Conta " + (active ? "reativada" : "desativada") + "!",
                        "A conta do usuario foi " + (active ? "reativada" : "desativada")
                                + " com sucesso e agora ele " + (active ? "já" : "não")
                                + " pode " + (active ? "voltar a" : "mais") + " acessar o sistema."));
            }
        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }
}