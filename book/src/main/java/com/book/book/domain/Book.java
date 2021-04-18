package com.book.book.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Table;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(appliesTo = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name="genre")
    private String genre;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="author_book",
            joinColumns = {@JoinColumn(name="book_id", referencedColumnName="id")},
            inverseJoinColumns = {@JoinColumn(name="author_id", referencedColumnName="id")}
    )
    @JsonIgnoreProperties("books")
    private List<Author> authors;

    public Book() {

    }

    public Book(String name, String genre)
    {
        this.name = name;
        this.genre = genre;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }



    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }

}
