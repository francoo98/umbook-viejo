package um.isa.umbook.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import um.isa.umbook.domain.Post;

public interface PostRepositoryWithBagRelationships {
    Optional<Post> fetchBagRelationships(Optional<Post> post);

    List<Post> fetchBagRelationships(List<Post> posts);

    Page<Post> fetchBagRelationships(Page<Post> posts);
}
