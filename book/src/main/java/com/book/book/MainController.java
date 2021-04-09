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
public class MainController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping
    public String getBooks(Model model, @RequestParam (required = false)List<Book> filterBook)
    {
        Iterable<Book> books = bookRepository.findAll();
        Iterable<Author> authors = authorRepository.findAll();
        Iterable<String> genres = bookRepository.findGenres();
        model.addAttribute("authors", authors);
        model.addAttribute("genres", genres);
        if (filterBook != null)
        {
            model.addAttribute("books", filterBook);
            return "main";
        }
        model.addAttribute("books", books);
        return "main";
    }



    @PostMapping("add")
    public String add(@RequestParam String name, @RequestParam(value = "author[]") List<String> authorNames,
                      @RequestParam String genre)
    {
        Book book = new Book(name, genre);
        List<Author> authors = authorRepository.findAuthorsByNameIn(authorNames);
        book.setAuthors(authors);
        bookRepository.save(book);
        return "redirect:/";
    }

    @GetMapping("filter")
    public String filter(@RequestParam (required = false)String author,
                         @RequestParam (required = false)String genre, Model model)
    {
        List<Book> books;
        List<Author> authorsNames = new ArrayList<>();
        authorsNames.add(authorRepository.findAuthorByName(author));
        if (author != null)
        {
            if (genre != null)
            {
                books = bookRepository.findBooksByAuthorsInAndGenre(authorsNames, genre);
            }
            else
            {
                books = bookRepository.findBooksByAuthorsIn(authorsNames);
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
        Iterable<String> genres = bookRepository.findGenres();
        model.addAttribute("books", books);
        model.addAttribute("authors", authors);
        model.addAttribute("genres", genres);
        return "main";
    }

    @PostMapping("edit")
    public String edit(@RequestParam Long id, Model model)
    {
        Iterable<Book> books = bookRepository.findAll();
        Book book = bookRepository.findBookById(id);
        List<Author> authors = authorRepository.findAll();
        List<Author>authors1 = authorRepository.findAll();
        Iterable<String> genres = bookRepository.findGenres();
        model.addAttribute("books", books);
        model.addAttribute("editBook", book);
        model.addAttribute("author", authors);
        model.addAttribute("authors", authors1);
        model.addAttribute("genres", genres);
        return "main";
    }

    @PostMapping("edit1")
    public String edit1(@RequestParam Long id, @RequestParam String name, @RequestParam(value = "author[]") List<String> authorNames,
                      @RequestParam String genre)
    {
        Book book = bookRepository.findBookById(id);
        book.setName(name);
        book.setGenre(genre);
        List<Author> authors = authorRepository.findAuthorsByNameIn(authorNames);
        book.setAuthors(authors);
        bookRepository.save(book);
        return "redirect:/";
    }

    @PostMapping("delete")
    public String delete(@RequestParam Long id)
    {
        bookRepository.delete(bookRepository.findBookById(id));
        return "redirect:/";
    }
}