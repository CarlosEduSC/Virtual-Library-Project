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

import com.example.demo.domain.usuario.DadosCadastroUsuario;
import com.example.demo.domain.usuario.DadosDetalharUsuario;
import com.example.demo.domain.usuario.DadosEditarUsuario;
import com.example.demo.domain.usuario.Usuario;
import com.example.demo.domain.usuario.UsuarioRepository;

import jakarta.validation.Valid;
import lombok.var;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Transactional
    @PostMapping("/cadastrar")
    public ResponseEntity<DadosDetalharUsuario> cadastrarUsuario(@Valid @RequestBody DadosCadastroUsuario dados, UriComponentsBuilder uriBuilder) {
        var usuario = new Usuario(dados);

        repository.save(usuario);

        var uri = uriBuilder.path("/usuario/cadastrar/{id}").buildAndExpand(usuario.getId()).toUri();

        return ResponseEntity.created(uri).body(new DadosDetalharUsuario(usuario));
    }

    @GetMapping("/buscar-todos")
    public ResponseEntity<List<DadosDetalharUsuario>> buscarTodosUsuarios() {
        var usuarios = repository.findAll();

        List<DadosDetalharUsuario> dadosUsuarios = new ArrayList<DadosDetalharUsuario>();

        for (Usuario usuario : usuarios) {
            dadosUsuarios.add(new DadosDetalharUsuario(usuario));
        }

        return ResponseEntity.ok(dadosUsuarios);
    }

    @GetMapping("/buscar-todos-ativos")
    public ResponseEntity<List<DadosDetalharUsuario>> buscarTodosUsuariosAtivos() {
        var usuarios = repository.findAllByStatusTrue();

        List<DadosDetalharUsuario> dadosUsuarios = new ArrayList<DadosDetalharUsuario>();

        for (Usuario usuario : usuarios) {
            dadosUsuarios.add(new DadosDetalharUsuario(usuario));
        }

        return ResponseEntity.ok(dadosUsuarios);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<DadosDetalharUsuario> buscarUsuarioPeloId(@PathVariable String id) {
        var usuario = repository.findById(id).get();

        return ResponseEntity.ok(new DadosDetalharUsuario(usuario));
    }

    @Transactional
    @PutMapping("/editar")
    public ResponseEntity<DadosDetalharUsuario> editarUsuario(@Valid @RequestBody DadosEditarUsuario dados) {
        var usuario = repository.findById(dados.id()).get();

        usuario.editarUsuario(dados);

        repository.save(usuario);

        return ResponseEntity.ok(new DadosDetalharUsuario(usuario));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/deletar/{id}")
    public ResponseEntity deletarUsuario(@PathVariable String id) {
        repository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}