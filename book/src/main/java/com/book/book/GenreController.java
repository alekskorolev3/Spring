package com.book.book;
import com.book.book.domain.Book;
import com.book.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class GenreController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping("genres")
    private String getGenres(Model model)
    {
        Iterable<Book> books = bookRepository.findAll();
        model.addAttribute("books", books);
        return "genres";
    }
    @PostMapping("editGenre")
    public String editGenre (@RequestParam Long id, Model model)
    {
        Iterable<Book> books = bookRepository.findAll();
        Book book = bookRepository.findBookById(id);
        model.addAttribute("books", books);
        model.addAttribute("genre", book);
        return "genres";
    }
    @PostMapping("editGenre1")
    public String editGenre1(@RequestParam Long id, @RequestParam String genre)
    {
        Book book = bookRepository.findBookById(id);
        book.setGenre(genre);
        bookRepository.save(book);
        return "redirect:/genres";
    }
}
