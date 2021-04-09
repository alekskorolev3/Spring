package com.book.book;
import com.book.book.domain.Author;
import com.book.book.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @GetMapping("author")
    public String getAuthors(Model model)
    {
        Iterable<Author> authors = authorRepository.findAll();
        model.addAttribute("authors", authors);
        return "authors";
    }
    @PostMapping("addAuthor")
    public String addAuthor(@RequestParam String name)
    {
        Author author = new Author(name);
        authorRepository.save(author);
        return "redirect:/author";
    }
    @PostMapping("editAuthor")
    public String editAuthor(@RequestParam Long id, Model model)
    {
        Author authorName = authorRepository.findAuthorById(id);
        Iterable<Author> authors = authorRepository.findAll();
        model.addAttribute("authorName", authorName);
        model.addAttribute("authors", authors);
        return "authors";
    }
    @PostMapping("editAuthor1")
    public String editAuthor1(@RequestParam Long id, @RequestParam String name)
    {
        Author author = authorRepository.findAuthorById(id);
        author.setName(name);
        authorRepository.save(author);
        return "redirect:/author";
    }
    @PostMapping("deleteAuthor")
    public String deleteAuthor(@RequestParam Long id)
    {
        Author author = authorRepository.findAuthorById(id);
        authorRepository.delete(author);
        return "redirect:/author";
    }
}
