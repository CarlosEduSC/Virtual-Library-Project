package library.domain.user;

public record ShowUserData(String id, String name, String email, String password, UserType type, Boolean active) {
    public ShowUserData(User user) {
        this(user.getId(), user.getName(), user.getEmail(), user.getPassword(), user.getType(), user.getActive());
    }
}
