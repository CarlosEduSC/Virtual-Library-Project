package library.domain.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AutenticationData(
    @NotBlank(message = "O email não pode estar vazio ou ser nulo!")
    @Email(message = "O email deve ter um formato valido!")
    String email,
    
    @NotBlank(message = "A senha não pode estar vazio ou ser nulo!")
    String password
) {}