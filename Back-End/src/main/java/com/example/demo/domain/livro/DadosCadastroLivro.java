package com.example.demo.domain.livro;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record DadosCadastroLivro(
    @NotBlank(message = "O nome não pode ser nulo ou estar em branco!")
    String nome,

    @NotBlank(message = "A data de criação não pode ser nula ou estar em branco!")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    String dataPublicacao,
    
    @NotBlank(message = "O nome do autor não pode ser nulo ou estar em branco!")
    String autor,
    
    @NotNull(message = "A quantidade de copias disponiveis não pode ser nula ou estar em branco!")
    @Positive(message = "A quantidade de copias disponiveis não pode ser negativa!")
    int copias) {}