package um.isa.umbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Post.
 */
@Entity
@Table(name = "post")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Post implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "contents")
    private String contents;

    @ManyToMany
    @JoinTable(name = "rel_post__like", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "like_id"))
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ownedBy", "createds", "follows", "followedBies", "likes" }, allowSetters = true)
    private Set<Profile> likes = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "ownedBy", "createds", "follows", "followedBies", "likes" }, allowSetters = true)
    private Profile createdBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Post id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Post title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContents() {
        return this.contents;
    }

    public Post contents(String contents) {
        this.setContents(contents);
        return this;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Set<Profile> getLikes() {
        return this.likes;
    }

    public void setLikes(Set<Profile> profiles) {
        this.likes = profiles;
    }

    public Post likes(Set<Profile> profiles) {
        this.setLikes(profiles);
        return this;
    }

    public Post addLike(Profile profile) {
        this.likes.add(profile);
        profile.getLikes().add(this);
        return this;
    }

    public Post removeLike(Profile profile) {
        this.likes.remove(profile);
        profile.getLikes().remove(this);
        return this;
    }

    public Profile getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(Profile profile) {
        this.createdBy = profile;
    }

    public Post createdBy(Profile profile) {
        this.setCreatedBy(profile);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Post)) {
            return false;
        }
        return id != null && id.equals(((Post) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Post{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", contents='" + getContents() + "'" +
            "}";
    }
}
