package com.example.demo.domain.livro;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public record DadosCadastroLivro(
    @NotBlank(message = "O nome não pode ser nulo ou estar em branco!")
    String nome,

    @NotBlank(message = "A data de criação não pode ser nula ou estar em branco!")
    @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}", message = "A data deve estar no formato dd/MM/yyyy")
    String dataPublicacao,
    
    @NotBlank(message = "O nome do autor não pode ser nulo ou estar em branco!")
    String autor,
    
    @NotNull(message = "A quantidade de copias disponiveis não pode ser nula ou estar em branco!")
    @Positive(message = "A quantidade de copias disponiveis não pode ser negativa!")
    @Min(value = 1, message = "A quantidade de copias diponiveis não pode ser zero!")
    int copias
) {}