package com.example.demo.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DadosCadastroUsuario(
    @NotBlank(message = "O nome não pode ser nulo ou estar em branco!")
    String nome,

    @NotBlank(message = "O email não pode ser nulo ou estar em branco!")
    @Email(message = "O email precisa estar em um formato valido (exemplo@ex.com)!")
    String email,

    @NotBlank(message = "A senha não pode ser nula ou estar em branco!")
    String senha,

    @NotNull(message = "O tipo do usuario não ser nulo!")
    TipoUsuario tipo
) {}
