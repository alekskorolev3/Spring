package com.book.book.repository;
import com.book.book.domain.Author;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface AuthorRepository extends CrudRepository<Author, Long>{

    List<Author> findAll();
    Author findAuthorByName(String name);
    Author findAuthorById(Long id);
    List<Author> findAuthorsByNameIn(List<String> authorNames);
}
