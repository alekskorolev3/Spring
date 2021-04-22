package com.book.book;

import com.book.book.domain.Author;
import com.book.book.domain.Book;
import com.book.book.repository.AuthorRepository;
import com.book.book.repository.BookRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BookApplicationTests {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Test
    void contextBookLoads() throws Exception {
        this.mockMvc.perform(get("/books_all"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void contextAuthorLoads() throws Exception {
        this.mockMvc.perform(get("/authors_all"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void contextGenreLoads() throws Exception {
        this.mockMvc.perform(get("/genres_all"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void addBookTest() throws Exception {
        Book book = new Book("test", "test");

        mockMvc.perform(post("/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(book)))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void editBookTest() throws Exception {
        Book book = new Book();
        mockMvc.perform(put("/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(book)))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void editAuthorTest() throws Exception {
        Author author = new Author();
        mockMvc.perform(put("/editAuthor")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(author)))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    void filterTest() throws Exception {
        Book book = new Book("test", "test");
        List<Author> authorList = new ArrayList<>();
        Author author = new Author("test");
        authorRepository.save(author);
        authorList.add(author);
        book.setAuthors(authorList);
        bookRepository.save(book);
        mockMvc.perform(put("/filter")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(book)))
                .andExpect(status().isOk());
        bookRepository.delete(book);
        authorRepository.delete(author);
    }

    @Test
    void deleteBookTest() throws Exception {
        Book book = new Book("test", "test");
        bookRepository.save(book);
        mockMvc.perform(delete("/delete/{id}", book.getId()))
                .andExpect(status().is2xxSuccessful());
        bookRepository.delete(book);
    }

    @Test
    void deleteAuthorTest() throws Exception {
        Author author = new Author("test");
        authorRepository.save(author);
        mockMvc.perform(delete("/deleteAuthor/{id}", author.getId()))
                .andExpect(status().is2xxSuccessful());
        authorRepository.delete(author);
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
