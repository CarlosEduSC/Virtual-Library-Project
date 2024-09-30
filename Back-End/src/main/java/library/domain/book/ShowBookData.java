package library.domain.book;

import java.time.LocalDate;

public record ShowBookData(
        String id,
        String title,
        LocalDate publishingDate,
        String author,
        String cover,
        int copysTotal,
        int availableCopys,
        boolean available
    ) {

    public ShowBookData(Book book) {
        this(
            book.getId(),
            book.getTitle(),
            book.getPublishingDate(),
            book.getAuthor(),
            book.getCover(),
            book.getCopysTotal(),
            book.getAvailableCopys(),
            book.getAvailable()
        );
    }
}
