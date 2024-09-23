package com.example.demo.domain.livro;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LivroRepository extends MongoRepository<Livro, String> {

    List<Livro> findAllByStatusTrue();
    
}
