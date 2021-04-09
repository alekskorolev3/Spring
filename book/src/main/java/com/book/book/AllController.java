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
public class AllController {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping("all")
    public String getAll(Model model)
    {
        Iterable<Book> books = bookRepository.findAll();
        Iterable<Author> authors = authorRepository.findAll();
        model.addAttribute("authors", authors);
        model.addAttribute("books", books);
        return "all";
    }
}
