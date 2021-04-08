package com.book.book;
import com.book.book.domain.Author;
import com.book.book.domain.Book;
import com.book.book.repository.AuthorRepository;
import com.book.book.repository.BookRepository;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.*;

@Controller
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public String getBooks(Model model, @RequestParam (required = false)List<Book> filterBook)
    {
        if (filterBook != null)
        {
            model.addAttribute("books", filterBook);
            Iterable<Author> authors;
            authors = authorRepository.findAll();
            model.addAttribute("authors", authors);
            return "main";
        }
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

    @GetMapping("filter")
    public String filter(@RequestParam (required = false)String author,
                         @RequestParam (required = false)String genre, Model model,
                         RedirectAttributes redirectAttributes)
    {
        List<Book> books;
        if (author != null)
        {
            if (genre != null)
            {
                books = bookRepository.findAll();
            }
            else
            {
                books = bookRepository.findAll();
            }
        }
        else
        {
            if (genre != null)
            {
                books = bookRepository.findBooksByGenre(genre);
            }
            else
            {
                books = bookRepository.findAll();
            }
        }
        Iterable<Author> authors = authorRepository.findAll();
        model.addAttribute("books", books);
        model.addAttribute("authors", authors);
        return "main";
    }
    @PostMapping("edit")
    public String edit(@RequestParam Long id, Model model)
    {
        Iterable<Book> books;
        books = bookRepository.findAll();
        model.addAttribute("books", books);

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
    @PostMapping("delete")
    public String delete(@RequestParam Long id)
    {
        Book book = bookRepository.findBookById(id);

        bookRepository.delete(book);
        return "redirect:/";
    }

}