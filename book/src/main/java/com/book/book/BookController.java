package com.book.book;

import com.book.book.domain.Book;
import com.book.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.Map;
import java.util.List;

@Controller
public class BookController {
    @Autowired
    private BookRepository bookRepository;
    @GetMapping
    public String getBooks(@RequestParam(required = false) String genre, @RequestParam (required = false) String author, Map<String, Object> model)
    {

        Iterable<Book> books;
        Iterable<String> genres;
        books = bookRepository.findAll();
        genres = bookRepository.findAllGenres();

        model.put("books", books);
        model.put("genres", genres);
        return "main";
    }
    @PostMapping
    public String add(@RequestParam String name, @RequestParam String author, @RequestParam String genre, Map<String, Object> model)
    {
        Book book = new Book(name, author, genre);
        bookRepository.save(book);
        Iterable<Book> books = bookRepository.findAll();
        model.put("books", books);
        return "main";
    }
    @PostMapping("Books")
    public String books(Map<String, Object> model)
    {
        Iterable<Book> books = bookRepository.findAll();
        model.put("books", books);
        return "main";
    }
    @PostMapping("filter")
    public String filter(@RequestParam (required = false)String author, @RequestParam (required = false)String genre, Map<String, Object> model)
    {
        Iterable<Book> books;
        Iterable<String> genres;
        genres = bookRepository.findAllGenres();
        if (author != null)
        {
            if (genre != null)
            {
                books = bookRepository.findByAuthorAndGenre(author, genre);
            }
            else
            {
                books = bookRepository.findByAuthor(author);
            }
        }
        else
        {
            if (genre != null)
            {
                books = bookRepository.findByGenre(genre);
            }
            else
            {
                books = bookRepository.findAll();
            }
        }
        model.put("books", books);
        model.put ("genres", genres);
        return "main";
    }
}