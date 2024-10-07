package library.domain.user;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    List<User> findAllByActive(boolean active);

    User findByEmail(String userEmail);

    boolean existsByEmail(String email);

    List<User> findAllByType(String type);
}
