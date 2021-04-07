package com.book.book;
import com.book.book.domain.Author;
import com.book.book.domain.Book;
import com.book.book.repository.AuthorRepository;
import com.book.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.*;

@Controller
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public String getBooks(Model model)
    {
        Iterable<Book> books;
        Iterable<Author> authors;

        books = bookRepository.findAll();
        authors = authorRepository.findAll();
        model.addAttribute("books", books);
        model.addAttribute("authors", authors);

        return "main";
    }

    @PostMapping("add")
    public String add(@RequestParam String name, @RequestParam(value = "author[]") List<String> authorNames,
                      @RequestParam String genre)
    {
        Book book = new Book(name, genre);

        List<Author> authors;

        authors = authorRepository.findAuthorsByNameIn(authorNames);
        book.setAuthors(authors);
        bookRepository.save(book);

        return "redirect:/";
    }
/*
    @GetMapping("filter")
    public String filter(@RequestParam (required = false)String author, @RequestParam (required = false)String genre, Map<String, Object> model)
    {
        Iterable<Book> books;

        if (author != null)
        {
            if (genre != null)
            {
                books = bookAuthorRepository.findByAuthorAndGenre(author, genre);
            }
            else
            {
                books = bookAuthorRepository.findByAuthor(author);
            }
        }
        else
        {
            if (genre != null)
            {
                books = bookAuthorRepository.findByGenre(genre);
            }
            else
            {
                books = bookAuthorRepository.findAll();
            }

        }
        model.put("books", books);
        return "main";
    }
*/
    @PostMapping("edit")
    public String edit(@RequestParam Long id, Model model)
    {
        Book book = bookRepository.findBookById(id);
        List<Author> authors = authorRepository.findAll();
        model.addAttribute("editBook", book);
        model.addAttribute("authors", authors);
        return "main";
    }
    @PostMapping("edit1")
    public String edit1(@RequestParam Long id, @RequestParam String name, @RequestParam(value = "author[]") List<String> authorNames,
                      @RequestParam String genre)
    {
        Book book = bookRepository.findBookById(id);

        book.setName(name);
        book.setGenre(genre);
        List<Author> authors;
        authors = authorRepository.findAuthorsByNameIn(authorNames);
        book.setAuthors(authors);

        bookRepository.save(book);
        return "redirect:/";
    }

}