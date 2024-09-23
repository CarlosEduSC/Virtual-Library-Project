package com.example.demo.domain.livro;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public record DadosEditarLivro(
    @NotNull(message = "O id não pode ser nulo!")
    String id,

    String nome,

    @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}", message = "A data deve estar no formato dd/MM/yyyy")
    String dataPublicacao,
    
    String autor,
    
    @Positive(message = "A quantidade de copias disponiveis não pode ser negativa!")
    int copias,

    Boolean status
) {}
