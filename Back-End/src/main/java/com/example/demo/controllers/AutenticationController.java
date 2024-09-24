package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.usuario.DadosAutenticacao;
import com.example.demo.domain.usuario.Usuario;
import com.example.demo.domain.usuario.UsuarioRepository;
import com.example.demo.infra.security.token.DadosToken;
import com.example.demo.infra.security.token.TokenService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/login")
public class AutenticationController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<DadosToken> efetuarLogin(@Valid @RequestBody DadosAutenticacao dados) {
        var usuario = repository.findByEmail(dados.email());

        var autenticationToken = new UsernamePasswordAuthenticationToken(dados.email(), dados.senha(), usuario.getAuthorities());

        var autentication = manager.authenticate(autenticationToken);

        var tokenJWT = tokenService.tokenGenerator((Usuario) autentication.getPrincipal());

        return ResponseEntity.ok(new DadosToken(tokenJWT));
    }
}
