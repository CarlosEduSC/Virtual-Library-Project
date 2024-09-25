package com.example.demo.domain.usuario;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "usuarios")
public class Usuario implements UserDetails{
	@Id
	private String id;
	private String nome;
	private String email;
	private String senha;
	private TipoUsuario tipo;
	private Boolean status;

	public Usuario(DadosCadastroUsuario dados) {
		this.nome = dados.nome();
        this.email = dados.email();
        this.senha = codificarSenha(dados.senha());
        this.tipo = dados.tipo();
        this.status = true;
	}

	public Usuario(DadosDetalharUsuario dados) {
        this(dados.id(), dados.nome(), dados.email(), codificarSenha(dados.senha()), dados.tipo(), dados.status());
    }

	public void editarUsuario(DadosEditarUsuario dados) {
		if (dados.nome() != null) {
			this.nome = dados.nome();
		}

		if (dados.email() != null) {
			this.email = dados.email();
		}

		if (dados.senha() != null) {
			this.senha = codificarSenha(dados.senha());
		}

		if (dados.tipo() != null) {
			this.tipo = dados.tipo();
		}

		if (dados.status() != this.status) {
			this.status = dados.status();
		}
	}

	public void desativarUsuario() {
		this.status = false;
	}

	public static String codificarSenha(String senha) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        
        return passwordEncoder.encode(senha);
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipo));
	}

	@Override
	public String getPassword() {
		return this.senha;
	}

	@Override
	public String getUsername() {
		return this.email;
	}
}