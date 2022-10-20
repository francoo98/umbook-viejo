package um.isa.umbook.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import um.isa.umbook.domain.Profile;

public interface ProfileRepositoryWithBagRelationships {
    Optional<Profile> fetchBagRelationships(Optional<Profile> profile);

    List<Profile> fetchBagRelationships(List<Profile> profiles);

    Page<Profile> fetchBagRelationships(Page<Profile> profiles);
}
