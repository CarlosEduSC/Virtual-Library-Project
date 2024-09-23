package com.example.demo.domain.livro;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

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
		this(UUID.randomUUID().toString(), dados.nome(), LocalDate.parse(dados.dataPublicacao(), FORMATTER), dados.autor(), dados.copias(), true);
	}


}
