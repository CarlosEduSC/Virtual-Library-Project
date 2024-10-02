package library.domain.user;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findAllByActiveTrue();

    User findByEmail(String userEmail);

    boolean existsByEmail(String email);

    List<User> findAllBytypeADMIN();

    List<User> findAllBytypeREADER();
}
