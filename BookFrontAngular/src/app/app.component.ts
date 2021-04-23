import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Book} from './entity/book';
import {BookService} from './book.service';
import {Author} from './entity/author';
import {Genre} from './entity/genre';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public books: Book[];
  public authors: Author[];
  public genres: Genre[];

  public editBook: Book;
  public nullAuthor: Author;
  public toggleAdd = false;
  public toggleEdit = false;
  public toggleEditAuthor = false;

  // tslint:disable-next-line:typedef
  public toggleAddBlock() {
    this.toggleAdd = !this.toggleAdd;
  }

  // tslint:disable-next-line:typedef
  public toggleEditBlock(book: Book) {
    this.toggleEdit = !this.toggleEdit;
    this.editBook = book;
  }

  // tslint:disable-next-line:typedef
  public toggleAddAuthor() {
    this.toggleEditAuthor = !this.toggleEditAuthor;
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getBooks();
    this.getAuthors();
    this.getGenres();
  }

  constructor(private bookService: BookService) {
  }

  public getBooks(): void {
    this.bookService.getBooks().subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    const results: Book[] = [];
    for (const book of this.books) {
      for (const author of book.authors) {
        if (author.name.indexOf(key) !== -1) {
          results.push(book);
        }
      }
      if (book.genre.indexOf(key) !== -1 ||
        book.name.indexOf(key) !== -1) {
        results.push(book);
      }
    }
    this.books = results;
    if (results.length === 0 || !key) {
      this.getBooks();
    }
  }

  public getAuthors(): void {
    this.bookService.getAuthors().subscribe(
      (response: Author[]) => {
        this.authors = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getGenres(): void {
    this.bookService.getGenres().subscribe(
      (response: Genre[]) => {
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddBook(addForm: NgForm): void {
    this.bookService.addBook(addForm.value).subscribe(
      () => {
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAuthor(addForm: NgForm): void {
    console.log(addForm.value);
    this.bookService.addAuthor(addForm.value).subscribe(
      () => {
        this.getBooks();
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditBook(editForm: NgForm): void {
    this.bookService.editBook(editForm.value).subscribe(
      () => {
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(
      () => {
        this.getBooks();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onFilterBook(filterForm: NgForm): void {
    console.log(filterForm.value);
    this.bookService.filterBook(filterForm.value).subscribe(
      (response: Book[]) => {
        this.books = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
