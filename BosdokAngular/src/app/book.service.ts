import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Book} from './entity/book';
import {environment} from '../environments/environment';
import {Author} from './entity/author';
import {Genre} from './entity/genre';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BookService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiServerUrl}/books_all`);
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiServerUrl}/authors_all`);
  }

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.apiServerUrl}/genres_all`);
  }

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiServerUrl}/add`, book);
  }

  public addAuthor(author: Author): Observable<Author> {
    return this.http.post<Author>(`${this.apiServerUrl}/addAuthor`, author);
  }

  public filterBook(book: Book): Observable<Book[]> {
    return this.http.put<Book[]>(`${this.apiServerUrl}/filter`, book);
  }

  public editBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiServerUrl}/edit`, book);
  }

  public deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${bookId}`);
  }

  public deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/deleteAuthor/${authorId}`);
  }

  public editAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiServerUrl}/editAuthor`, author);
  }
}
