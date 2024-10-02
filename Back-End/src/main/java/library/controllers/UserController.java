package library.controllers;

import java.util.ArrayList;
import java.util.List;

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
        String errorTitle = "Erro ao tentar cadastrar o usuario!";

        if (repository.existsByEmail(data.email())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new AlertData(errorTitle, "Email já está em uso."));
        }

        try {
            var user = new User(data);

            repository.save(user);

            var uri = uriBuilder.path("/user/create/{id}").buildAndExpand(user.getId()).toUri();

            return ResponseEntity.created(uri).body(new AlertData("Usuário Criado com Sucesso!",
                    "O novo usuário foi cadastrado com sucesso e agora pode acessar o sistema."));

        } catch (DataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(errorTitle, "Erro ao salvar o usuário no banco de dados."));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(errorTitle, "Erro inesperado ao criar o usuário."));
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all")
    public ResponseEntity findAllUsers() {
        try {
            var users = repository.findAll();

            List<ShowUserData> usersData = new ArrayList<ShowUserData>();

            for (User user : users) {
                usersData.add(new ShowUserData(user));
            }

            return ResponseEntity.ok(usersData);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData("Erro ao buscar todos os usuarios!",
                            "Ocorreu um erro inesperado no servidor."));
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-active")
    public ResponseEntity findAllUsersActive() {
        try {
            var users = repository.findAllByActiveTrue();

            List<ShowUserData> usersData = new ArrayList<ShowUserData>();

            for (User user : users) {
                usersData.add(new ShowUserData(user));
            }

            return ResponseEntity.ok(usersData);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData("Erro ao buscar os usuarios com contas ativas!",
                            "Ocorreu um erro inesperado no servidor."));
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-admins")
    public ResponseEntity findAllAdmins() {
        try {
            var users = repository.findAllBytypeADMIN();

            List<ShowUserData> usersData = new ArrayList<ShowUserData>();

            for (User user : users) {
                usersData.add(new ShowUserData(user));
            }

            return ResponseEntity.ok(usersData);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData("Erro ao buscar os usuarios do tipo administrador!",
                            "Ocorreu um erro inesperado no servidor."));
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-readers")
    public ResponseEntity findAllReaders() {
        try {
            var users = repository.findAllBytypeREADER();

            List<ShowUserData> usersData = new ArrayList<ShowUserData>();

            for (User user : users) {
                usersData.add(new ShowUserData(user));
            }

            return ResponseEntity.ok(usersData);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData("Erro ao buscar os usuarios do tipo leitor!",
                            "Ocorreu um erro inesperado no servidor."));
        }
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ShowUserData> findUserById(@PathVariable String id) {
        var user = repository.findById(id).get();

        return ResponseEntity.ok(new ShowUserData(user));
    }

    @Transactional
    @PutMapping("/update")
    public ResponseEntity<ShowUserData> updateUser(@Valid @RequestBody UpdateUserData data) {
        var user = repository.findById(data.id()).get();

        user.updateUser(data);

        repository.save(user);

        return ResponseEntity.ok(new ShowUserData(user));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteUser(@PathVariable String id) {
        var user = repository.findById(id).get();

        user.setActive(false);

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("reactivate/{id}")
    public ResponseEntity reactivateUser(@PathVariable String id) {
        var user = repository.findById(id).get();

        user.setActive(true);

        return ResponseEntity.noContent().build();
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
}