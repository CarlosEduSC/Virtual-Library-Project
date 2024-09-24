package com.example.demo.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.demo.domain.livro.DadosCadastroLivro;
import com.example.demo.domain.livro.DadosDetalharLivro;
import com.example.demo.domain.livro.DadosEditarLivro;
import com.example.demo.domain.livro.Livro;
import com.example.demo.domain.livro.LivroRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("livro")
public class LivroController {
    @Autowired
    private LivroRepository repository;

    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity<DadosDetalharLivro> cadastroLivro(@Valid @RequestBody DadosCadastroLivro dados, UriComponentsBuilder uriBuilder) {
        var livro = new Livro(dados);

        repository.save(livro);

        var uri = uriBuilder.path("/livro/cadastrar/{id}").buildAndExpand(livro.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharLivro(livro));
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<List<DadosDetalharLivro>> buscarTodosLivros() {
        var livros = repository.findAll();

        List<DadosDetalharLivro> dadosLivros = new ArrayList<DadosDetalharLivro>();

        for (Livro livro : livros) {
            dadosLivros.add(new DadosDetalharLivro(livro));
        }

        return ResponseEntity.ok(dadosLivros);
    }

    @GetMapping("/buscar-todos-disponiveis")
    public ResponseEntity<List<DadosDetalharLivro>> buscarTodosLivrosDisponiveis() {
        var livros = repository.findAllByStatusTrue();

        List<DadosDetalharLivro> dadosLivros = new ArrayList<DadosDetalharLivro>();

        for (Livro livro : livros) {
            dadosLivros.add(new DadosDetalharLivro(livro));
        }

        return ResponseEntity.ok().body(dadosLivros);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<DadosDetalharLivro> buscarLivroPeloId(@PathVariable String id) {
        var livro = repository.findById(id).get();



        return ResponseEntity.ok(new DadosDetalharLivro(livro));
    }

    @Transactional
    @PutMapping("/editar")
    public ResponseEntity<DadosDetalharLivro> editarLivro(@Valid @RequestBody DadosEditarLivro dados) {
        var livro = repository.findById(dados.id()).get();

        livro.atualizarLivro(dados);

        repository.save(livro);

        return ResponseEntity.ok(new DadosDetalharLivro(livro));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity deletarLivro(@PathVariable String id) {
        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}