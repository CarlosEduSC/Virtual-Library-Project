package com.example.demo.domain.livro;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "livros")
public class Livro {
	@Id
    private String id;
	private String nome;
	private LocalDate dataPublicacao;
	private String autor;
	private int copias;
	private Boolean status;

	private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	public Livro(DadosCadastroLivro dados) {
		this.nome = dados.nome();
		this.dataPublicacao = LocalDate.parse(dados.dataPublicacao(), FORMATTER);
		this.autor = dados.autor();
		this.copias = dados.copias();
		this.status = true;
	}

	public void atualizarLivro(DadosEditarLivro dados) {
		if (dados.nome() != null) {
			this.nome = dados.nome();
		}

		if (dados.dataPublicacao() != null) {
			this.dataPublicacao = LocalDate.parse(dados.dataPublicacao(), FORMATTER);
		}

		if (dados.autor() != null) {
			this.autor = dados.autor();
		}

		if (dados.copias() >= 0) {
			if (dados.copias() == 0) {
				this.status = false;
			
			} else {
				this.status = true;
			}
			this.copias = dados.copias();
		}
	}
}
