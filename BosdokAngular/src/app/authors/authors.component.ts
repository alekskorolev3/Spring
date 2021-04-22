import {Component, OnInit} from '@angular/core';
import {Author} from '../entity/author';
import {BookService} from '../book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  public authors: Author[];
  public toggleEdit = false;
  public editAuthor: Author;
  public showBooks = true;

  // tslint:disable-next-line:typedef
  public toggleEditBlock(author: Author) {
    this.toggleEdit = !this.toggleEdit;
    this.editAuthor = author;
  }

  constructor(private bookService: BookService) {
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

  public onEditAuthor(editForm: NgForm): void {
    this.bookService.editAuthor(editForm.value).subscribe(
      () => {
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteAuthor(authorId: number): void {
    this.bookService.deleteAuthor(authorId).subscribe(
      () => {
        this.getAuthors();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getAuthors();
    this.showBooks = false;
  }

}
