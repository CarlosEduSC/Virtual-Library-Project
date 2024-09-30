package library.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.validation.Valid;
import library.domain.book.Book;
import library.domain.book.BookRepository;
import library.domain.book.CreateBookData;
import library.domain.book.ShowBookData;
import library.domain.book.UpdateBookData;

@RestController
@RequestMapping("book")
public class BookController {
    @Autowired
    private BookRepository repository;

    @Transactional
    @PostMapping("/create")
    public ResponseEntity<ShowBookData> createBook(@Valid @RequestBody CreateBookData data, UriComponentsBuilder uriBuilder) {
        var book = new Book(data);

        repository.save(book);

        var uri = uriBuilder.path("/book/create/{id}").buildAndExpand(book.getId()).toUri();

        return ResponseEntity.created(uri).body(new ShowBookData(book));
    }

    @GetMapping("/find-all")
    public ResponseEntity<List<ShowBookData>> findAllBooks() {
        var books = repository.findAll();

        List<ShowBookData> booksData = new ArrayList<ShowBookData>();

        for (Book book : books) {
            booksData.add(new ShowBookData(book));
        }

        return ResponseEntity.ok(booksData);
    }

    @GetMapping("/find-all-available")
    public ResponseEntity<List<ShowBookData>> findAllAvailableBooks() {
        var books = repository.findAllByAvailableTrue();

        List<ShowBookData> booksData = new ArrayList<ShowBookData>();

        for (Book book : books) {
            booksData.add(new ShowBookData(book));
        }

        return ResponseEntity.ok().body(booksData);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ShowBookData> findBookById(@PathVariable String id) {
        var book = repository.findById(id).get();

        return ResponseEntity.ok(new ShowBookData(book));
    }

    @Transactional
    @PutMapping("/update")
    public ResponseEntity<ShowBookData> updateBook(@Valid @RequestBody UpdateBookData data) {
        var book = repository.findById(data.id()).get();

        book.updateBook(data);

        repository.save(book);

        return ResponseEntity.ok(new ShowBookData(book));
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteBook(@PathVariable String id) {
        var book = repository.findById(id).get();

        book.setAvailable(false);

        return ResponseEntity.noContent().build();
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("reactivate/{id}")
    public ResponseEntity reactivateBook(@PathVariable String id) {
        var book = repository.findById(id).get();

        book.setAvailable(true);
        
        return ResponseEntity.noContent().build();
    }
}