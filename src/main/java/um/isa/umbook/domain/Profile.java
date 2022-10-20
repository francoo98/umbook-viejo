package um.isa.umbook.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Profile.
 */
@Entity
@Table(name = "profile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Profile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "creacion")
    private LocalDate creacion;

    @OneToOne
    @JoinColumn(unique = true)
    private User ownedBy;

    @OneToMany(mappedBy = "createdBy")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "likes", "createdBy" }, allowSetters = true)
    private Set<Post> createds = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_profile__follows",
        joinColumns = @JoinColumn(name = "profile_id"),
        inverseJoinColumns = @JoinColumn(name = "follows_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ownedBy", "createds", "follows", "followedBies", "likes" }, allowSetters = true)
    private Set<Profile> follows = new HashSet<>();

    @ManyToMany(mappedBy = "follows")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "ownedBy", "createds", "follows", "followedBies", "likes" }, allowSetters = true)
    private Set<Profile> followedBies = new HashSet<>();

    @ManyToMany(mappedBy = "likes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "likes", "createdBy" }, allowSetters = true)
    private Set<Post> likes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Profile id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public Profile username(String username) {
        this.setUsername(username);
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public Profile password(String password) {
        this.setPassword(password);
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public Profile email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getCreacion() {
        return this.creacion;
    }

    public Profile creacion(LocalDate creacion) {
        this.setCreacion(creacion);
        return this;
    }

    public void setCreacion(LocalDate creacion) {
        this.creacion = creacion;
    }

    public User getOwnedBy() {
        return this.ownedBy;
    }

    public void setOwnedBy(User user) {
        this.ownedBy = user;
    }

    public Profile ownedBy(User user) {
        this.setOwnedBy(user);
        return this;
    }

    public Set<Post> getCreateds() {
        return this.createds;
    }

    public void setCreateds(Set<Post> posts) {
        if (this.createds != null) {
            this.createds.forEach(i -> i.setCreatedBy(null));
        }
        if (posts != null) {
            posts.forEach(i -> i.setCreatedBy(this));
        }
        this.createds = posts;
    }

    public Profile createds(Set<Post> posts) {
        this.setCreateds(posts);
        return this;
    }

    public Profile addCreated(Post post) {
        this.createds.add(post);
        post.setCreatedBy(this);
        return this;
    }

    public Profile removeCreated(Post post) {
        this.createds.remove(post);
        post.setCreatedBy(null);
        return this;
    }

    public Set<Profile> getFollows() {
        return this.follows;
    }

    public void setFollows(Set<Profile> profiles) {
        this.follows = profiles;
    }

    public Profile follows(Set<Profile> profiles) {
        this.setFollows(profiles);
        return this;
    }

    public Profile addFollows(Profile profile) {
        this.follows.add(profile);
        profile.getFollowedBies().add(this);
        return this;
    }

    public Profile removeFollows(Profile profile) {
        this.follows.remove(profile);
        profile.getFollowedBies().remove(this);
        return this;
    }

    public Set<Profile> getFollowedBies() {
        return this.followedBies;
    }

    public void setFollowedBies(Set<Profile> profiles) {
        if (this.followedBies != null) {
            this.followedBies.forEach(i -> i.removeFollows(this));
        }
        if (profiles != null) {
            profiles.forEach(i -> i.addFollows(this));
        }
        this.followedBies = profiles;
    }

    public Profile followedBies(Set<Profile> profiles) {
        this.setFollowedBies(profiles);
        return this;
    }

    public Profile addFollowedBy(Profile profile) {
        this.followedBies.add(profile);
        profile.getFollows().add(this);
        return this;
    }

    public Profile removeFollowedBy(Profile profile) {
        this.followedBies.remove(profile);
        profile.getFollows().remove(this);
        return this;
    }

    public Set<Post> getLikes() {
        return this.likes;
    }

    public void setLikes(Set<Post> posts) {
        if (this.likes != null) {
            this.likes.forEach(i -> i.removeLike(this));
        }
        if (posts != null) {
            posts.forEach(i -> i.addLike(this));
        }
        this.likes = posts;
    }

    public Profile likes(Set<Post> posts) {
        this.setLikes(posts);
        return this;
    }

    public Profile addLikes(Post post) {
        this.likes.add(post);
        post.getLikes().add(this);
        return this;
    }

    public Profile removeLikes(Post post) {
        this.likes.remove(post);
        post.getLikes().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profile)) {
            return false;
        }
        return id != null && id.equals(((Profile) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profile{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", creacion='" + getCreacion() + "'" +
            "}";
    }
}
