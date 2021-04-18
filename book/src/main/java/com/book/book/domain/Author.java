package com.book.book.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Table;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(appliesTo = "author")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id",unique=true, nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "last_name")
    private String lastName;

    @ManyToMany
    @JoinTable(name="author_book",
            joinColumns = {@JoinColumn(name="author_id", referencedColumnName="id")},
            inverseJoinColumns = {@JoinColumn(name="book_id", referencedColumnName="id")}
    )
    @JsonIgnoreProperties("authors")
    private List<Book> books;


    public Author() {
    }

    public Author(String author) {
        name = author;
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

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }




    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public void addBook(Book book)
    {
        this.books.add(book);
    }
}


