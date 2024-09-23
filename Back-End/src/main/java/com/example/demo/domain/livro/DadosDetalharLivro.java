package com.example.demo.domain.livro;

import java.time.LocalDate;

public record DadosDetalharLivro(String id,  String nome, LocalDate dataPublicacao, String autor, int copias, boolean status) {
    public DadosDetalharLivro(Livro livro) {
        this(livro.getId(), livro.getNome(), livro.getDataPublicacao(), livro.getAutor(), livro.getCopias(), livro.getStatus());
    }
}
