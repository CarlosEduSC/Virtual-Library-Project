package com.example.demo.domain.usuario;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String>{

    List<Usuario> findAllByStatusTrue();

    Usuario findByEmail(String userEmail);
}
