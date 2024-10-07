package library.domain.book;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findAllByAvailable(boolean available);

    boolean existsByTitleAndPublishingDateAndAuthor(String title, LocalDate publishingDate, String author);
    
}
