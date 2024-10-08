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
	private Boolean available;

	public static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

	public Book(CreateBookData data) {
		this.title = data.title();
		this.publishingDate = LocalDate.parse(data.publishingDate(), FORMATTER);
		this.author = data.author();
		this.copysTotal = data.copysTotal();
		this.availableCopys = data.copysTotal();
		this.available = true;

		if (data.cover() == "") {
			this.cover = "data:image/jpeg;base64,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Ed30GXQvEl04cTVaueDcb2dQUvYagfwEh4Sby147R4tqNLV6yEd31CXQvEl04cTVZSJVxmFPnP7CtyN9nx2jxbUaWegK7vsEuhgkunBxNViuiUxwLqfOfWGdyVjx2jxbUaWL6tB9wl0LxJdOHEsKyZTGs+p859IORUqj8+O0eLajTY6MuheJLpw4mdg1sWJbzx2jxbUabJQl0LxJdOHE1fNEcbxbzx2jxbW6bLRl0LxJQFfmUmuzjFS2+/zcni1Wfmw2TFdnBQGLOWQfNPN1cWQBiNYOCBX5u/NQiBQXJsykWqbFIGHk4vX1vfxY/wDRp+xFrj9CUTE2Jij3IjA9MmEhAYB84R5WYwpV4vjTeUau94s0ZHacp2nKdpynacp2nKdpynacp2nKdpynacp2nKdpynacp2nKdpynacp2nKdrV4d7ezeNVQJAm1GKhhHdxu6AzHBlIXkYO8GuGzV0A5b5U6vnePYAGW6Yd6NJ76e/nv57+e/nv57+e/nv57+e/nv57+e/nv57+e/nv4jBS7lDpiq1Wr/x2/8A/9oADAMBAAIAAwAAABD77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777nDHHHHHHHHnH777777777777777777777777777776l7zzzzzzzzzz/AN++++++++++++++++++++++++++++8d6zyyyyyyyy258U+++++++++++++++++++++++++++v8AD/vvvvvvvvvq9KPvvvvvvvvvvvvvvvvvvvvvvvvvvtfNvvvvvvvZXvvnL/vvvvvvvvvvvvvvvvvvvvvvvvvvlfFvvvvvvvOVPvvP/vvvvvvvvvvvvvvvvvvvvvvvvvvlfFvufXUvvvvvvvP/AL77777777777777777777777775XxaJzjz1j773T7z/AO++++++++++++++++++++++++++V8Kc9+J+8YEdva0/+++++++++++++++++++++++++++V889/++Z+88yw88/+++++++++++++++++++++++++++V89/8AvvvmfvPLd/P/AL77777777777777777777777775XxX777775n7x217/AO++++++++++++++++++++++++++d8e+++++++Z0c+07+++++++++++++++++++++++++++/8f8AvvvvvvvvvrnbPvvvvvvvvvvvvvvvvvvvvvvvvvvqPfq/PPPPPPPKjfNPvvvvvvvvvvvvvvvvvvvvvvvvvvvqOvPPPPPPPPPP5fvvvvvvvvvvvvvvvvvvvvvvvvvvvvvrXTTTTTTTTXbfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv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";
		
		} else {
			this.cover = data.cover();
		}
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

		if (data.copys() >= 0) {
			if (data.copys() == 0) {
				this.available = false;

			} else {
				this.available = true;
			}
			this.copysTotal = data.copys();
		}
	}
}
