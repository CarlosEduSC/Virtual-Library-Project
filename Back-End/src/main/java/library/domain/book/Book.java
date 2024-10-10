package library.domain.book;

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
@Document(collection = "books")
public class Book {
	@Id
	private String id;
	private String title;
	private LocalDate publishingDate;
	private String author;
	private String cover;
	private int copysTotal;
    private int availableCopys;
    private int borrowedCopys;
	private Boolean available;

	public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	public Book(CreateBookData data) {
		this.title = data.title();
		this.publishingDate = LocalDate.parse(data.publishingDate(), FORMATTER);
		this.author = data.author();
		this.cover = data.cover();
		this.copysTotal = data.copysTotal();
		this.availableCopys = data.copysTotal();
		this.borrowedCopys = 0;
		this.available = true;
	}

	public void updateBook(UpdateBookData data) {
		if (data.title() != null) {
			this.title = data.title();
		}

		if (data.publishingDate() != null) {
			this.publishingDate = LocalDate.parse(data.publishingDate(), FORMATTER);
		}

		if (data.author() != null) {
			this.author = data.author();
		}

		if (data.cover() != null) {
			this.cover = data.cover();
		}

		if (data.copysTotal() >= 0) {
            this.copysTotal = data.copysTotal();

			this.availableCopys = data.availableCopys();

            this.available = this.availableCopys > 0;
		}
	}
}
