package com.example.demo.domain.usuario;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record DadosEditarUsuario(
    @NotNull
    String id,
    
    String nome,

    @Email(message = "O email precisa estar em um formato valido (exemplo@ex.com)!")
    String email,

    String senha,

    TipoUsuario tipo,

    Boolean status
) {}
