package com.book.book;

import com.book.book.domain.Author;
import com.book.book.domain.Book;
import com.book.book.repository.AuthorRepository;
import com.book.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class MainController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping("/books_all")
    public ResponseEntity<List<Book>> getBooks() {
        List<Book> books = bookRepository.findAll();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/authors_all")
    public ResponseEntity<List<Author>> getAuthors() {
        List<Author> authors = authorRepository.findAll();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping("/genres_all")
    public ResponseEntity<List<String>> getGenres() {
        List<String> genres = bookRepository.findGenres();
        return new ResponseEntity<>(genres, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book newBook = bookRepository.save(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }


    @PutMapping("/edit")
    public ResponseEntity<Book> editBook(@RequestBody Book book) {
        Book editBook = bookRepository.save(book);
        return new ResponseEntity<>(editBook, HttpStatus.CREATED);
    }

    @PutMapping("/editAuthor")
    public ResponseEntity<Author> editAuthor(@RequestBody Author author) {
        Author editAuthor = authorRepository.save(author);
        return new ResponseEntity<>(editAuthor, HttpStatus.CREATED);
    }

    @PutMapping("/filter")
    public ResponseEntity<List<Book>> filterBook(@RequestBody Book book) {
        List<Book> filterBook;
        if (!book.getGenre().equals("")) {
            if (!book.getAuthors().contains(null)) {
                filterBook = bookRepository.findBooksByAuthorsInAndGenre(book.getAuthors(), book.getGenre());
            } else {
                filterBook = bookRepository.findBooksByGenre(book.getGenre());
            }
        } else {
            if (book.getAuthors() != null) {
                filterBook = bookRepository.findBooksByAuthorsIn(book.getAuthors());
            } else {
                filterBook = bookRepository.findAll();
            }
        }
        return new ResponseEntity<>(filterBook, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable("id") Long id) {
        Book book = bookRepository.findBookById(id);
        bookRepository.delete(book);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteAuthor/{id}")
    public ResponseEntity<?> deleteAuthor(@PathVariable("id") Long id) {
        Author author = authorRepository.findAuthorById(id);
        authorRepository.delete(author);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
