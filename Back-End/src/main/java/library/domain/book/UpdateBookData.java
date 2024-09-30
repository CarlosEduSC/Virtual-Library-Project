package library.domain.book;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

public record UpdateBookData(
    @NotNull(message = "O id não pode ser nulo!")
    String id,

    String tittle,

    @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}", message = "A data deve estar no formato dd/MM/yyyy")
    String publishingDate,
    
    String author,

    String cover,
    
    @Positive(message = "A quantidade de copias disponiveis não pode ser negativa!")
    int copys,

    Boolean active
) {}
