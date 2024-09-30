package library.domain.user;

import java.util.Collection;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User implements UserDetails{
	@Id
	private String id;
	private String name;
	private String email;
	private String password;
	private UserType type;
	private Boolean active;

	public User(CreateUserData data) {
		this.name = data.name();
        this.email = data.email();
        this.password = encryptPassword(data.password());
        this.type = data.type();
        this.active = true;
	}

	public User(ShowUserData data) {
        this(data.id(), data.name(), data.email(), encryptPassword(data.password()), data.type(), data.active());
    }

	public void updateUser(UpdateUserData data) {
		if (data.name() != null) {
			this.name = data.name();
		}

		if (data.email() != null) {
			this.email = data.email();
		}

		if (data.password() != null) {
			this.password = encryptPassword(data.password());
		}

		if (data.type() != null) {
			this.type = data.type();
		}

		if (data.active() != this.active) {
			this.active = data.active();
		}
	}

	public static String encryptPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        
        return passwordEncoder.encode(password);
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority("ROLE_" + this.type));
	}

	@Override
	public String getPassword() {
		return this.password;
	}

	@Override
	public String getUsername() {
		return this.email;
	}
}