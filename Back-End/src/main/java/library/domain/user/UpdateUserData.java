package library.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UpdateUserData(
    @NotNull
    String id,
    
    String name,

    @Email(message = "O email precisa estar em um formato valido (exemplo@ex.com)!")
    String email,

    String password,

    UserType type,

    Boolean active
) {}
