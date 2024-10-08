package library.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
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

import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import library.domain.book.Book;
import library.domain.book.BookRepository;
import library.domain.book.CreateBookData;
import library.domain.book.ShowBookData;
import library.domain.book.UpdateBookData;
import library.infra.AlertData;

@RestController
@RequestMapping("book")
public class BookController {
    @Autowired
    private BookRepository repository;

    @SuppressWarnings("rawtypes")
    @Transactional
    @PostMapping("/create")
    public ResponseEntity createBook(@Valid @RequestBody CreateBookData data, UriComponentsBuilder uriBuilder) {
        String errorTitle = errorTitleGenerate("cadastrar o livro");

        if (repository.existsByTitleAndPublishingDateAndAuthor(data.title(),
                LocalDate.parse(data.publishingDate(), Book.FORMATTER), data.author())) {

            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new AlertData(errorTitle, "Um livro com o mesmo titulo, autor e data de publicação já está cadastrado."));
        }

        try {
            var book = new Book(data);

            repository.save(book);

            var uri = uriBuilder.path("/book/create/{id}").buildAndExpand(book.getId()).toUri();

            return ResponseEntity.created(uri).body(new AlertData("Livro cadastrado!",
                    "O novo livro foi cadastrado com sucesso e já pode ser acessado no sistema."));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all")
    public ResponseEntity findAllBooks() {
        String errorTitle = errorTitleGenerate("buscar todos os livros");

        try {
            var books = repository.findAll();

            List<ShowBookData> booksData = new ArrayList<ShowBookData>();

            for (Book book : books) {
                booksData.add(new ShowBookData(book));
            }

            return ResponseEntity.ok(booksData);

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-available")
    public ResponseEntity findAllAvailableBooks() {
        String errorTitle = errorTitleGenerate("buscar os livros disponiveis");

        try {
            var books = repository.findAllByAvailable(true);

            return ResponseEntity.ok().body(mapBooks(books));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find-all-unavailable")
    public ResponseEntity findAllUnavailableBooks() {
        String errorTitle = errorTitleGenerate("buscar os livros indisponiveis");

        try {
            var books = repository.findAllByAvailable(false);

            return ResponseEntity.ok().body(mapBooks(books));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @GetMapping("/find/{id}")
    public ResponseEntity findBookById(@PathVariable String id) {
        String errorTitle = errorTitleGenerate("buscar livro");
        var optionalBook = repository.findById(id);

        try {
            if (optionalBook.isPresent()) {
                var book = optionalBook.get();
                return ResponseEntity.ok(new ShowBookData(book));

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Livro não encontrado."));
            }
        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @PutMapping("/update")
    public ResponseEntity updateBook(@Valid @RequestBody UpdateBookData data) {
        String errorTitle = errorTitleGenerate("atualizar os dados do livro");

        try {
            var optionalBook = repository.findById(data.id());

            if (optionalBook.isPresent()) {
                var book = optionalBook.get();

                book.updateBook(data);

                repository.save(book);

                return ResponseEntity.ok(new ShowBookData(book));

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Livro não encontrado."));
            }
        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteBook(@PathVariable String id) {
        String errorTitle = errorTitleGenerate("deletar livro");

        if (repository.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new AlertData(errorTitle, "Livro não encontrado."));
        }

        try {
            repository.deleteById(id);

            return ResponseEntity.ok().body(new AlertData("Livro deletado", "O livro foi deletado com sucesso."));

        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    @DeleteMapping("/make-unavailable/{id}")
    public ResponseEntity makeBookAvailable(@PathVariable String id) {
        return changeBookAvailable(id, false);
    }

    @SuppressWarnings("rawtypes")
    @PutMapping("/make-available/{id}")
    public ResponseEntity MmkeBookUnavailable(@PathVariable String id) {
        return changeBookAvailable(id, true);
    }

    public String errorTitleGenerate(String text) {
        return "Erro ao tentar " + text + "!";
    }

    @SuppressWarnings("rawtypes")
    public ResponseEntity handleError(String title, Exception e) {
        if (e instanceof DataAccessException) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(title, "Ocorreu um erro ao acessar o banco de dados."));

        } else if (e instanceof ConstraintViolationException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new AlertData(title, "Violação de integridade dos dados ao tentar salvar o livro."));

        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AlertData(title, "Ocorreu um erro inesperado no servidor."));
        }
    }

    public List<ShowBookData> mapBooks(List<Book> books) {
        List<ShowBookData> booksData = new ArrayList<ShowBookData>();

        for (Book book : books) {
            booksData.add(new ShowBookData(book));
        }

        return booksData;
    }

    @SuppressWarnings("rawtypes")
    @Transactional
    public ResponseEntity changeBookAvailable(@PathVariable String id, boolean available) {
        String errorTitle = errorTitleGenerate("tornar livro" + (available ? "disponivel" : "indisponivel"));

        try {
            Optional<Book> optionalBook = repository.findById(id);

            if (optionalBook.isPresent()) {
                var book = optionalBook.get();

                if (book.getAvailable() == available) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(new AlertData(errorTitle,
                                    "O livro já está " + (available ? "disponivel" : "indisponivel") + "."));

                } else if (available && book.getCopysTotal() == 0) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(new AlertData(errorTitle,
                                    "Para tornar o livro disponivel é nescessario que o livro tenha ao menos uma copia."));

                } else {
                    book.setAvailable(available);

                    repository.save(book);

                    return ResponseEntity.ok()
                            .body(new AlertData("Livro " + (available ? "disponivel" : "indisponivel") + "!",
                                    "O livro foi " + (available ? "disponibilizado" : "indisponibilizado")
                                            + " com sucesso e agora ele " + (available ? "já" : "não")
                                            + " pode " + (available ? "voltar a ser" : "mais ser")
                                            + " acessado no sistema."));
                }

            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new AlertData(errorTitle, "Livro não encontrado."));
            }
        } catch (Exception e) {
            return handleError(errorTitle, e);
        }
    }
}