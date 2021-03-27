package com.book.book.repository;

import com.book.book.domain.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
public interface BookRepository extends CrudRepository<Book, Long>{
    List<Book> findByAuthor(String author);
    List<Book> findByAuthorAndGenre(String author, String genre);
    List<Book> findByGenre(String genre);
    List<String> findAllByAuthor();
    @Query("select distinct b.genre from Book b")
    List<String> findAllGenres();


}
