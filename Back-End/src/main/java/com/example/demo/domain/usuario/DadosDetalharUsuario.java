package com.example.demo.domain.usuario;

public record DadosDetalharUsuario(String id, String nome, String email, String senha, TipoUsuario tipo, Boolean status) {
    public DadosDetalharUsuario(Usuario usuario) {
        this(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getSenha(), usuario.getTipo(), usuario.getStatus());
    }
}
