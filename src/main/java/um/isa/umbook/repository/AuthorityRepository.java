package um.isa.umbook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import um.isa.umbook.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
