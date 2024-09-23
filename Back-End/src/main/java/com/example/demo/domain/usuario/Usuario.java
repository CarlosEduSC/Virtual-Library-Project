package com.example.demo.domain.usuario;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
	private int id;
	private String nome;
	private String email;
	private String senha;
	private TipoUsuario tipo;
}