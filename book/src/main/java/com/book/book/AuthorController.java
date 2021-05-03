package com.book.book;

import com.book.book.domain.Author;
import com.book.book.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @PostMapping("/addAuthor")
    public ResponseEntity<Author> addAuthor(@RequestBody Author author) {
        Author editAuthor = authorRepository.save(author);
        return new ResponseEntity<>(editAuthor, HttpStatus.CREATED);
    }
}
