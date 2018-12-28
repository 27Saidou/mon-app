import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks(); 
  }
/*cette methode permet de créer des livres */
  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }
/*cette methode permet de supprimer des livres*/
  onDeleteBook(book: Book) {
    this.booksService.removeBook(book);
  }
/*cette methode permet de voir les livres */
  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  /*Mettez la logique de nettoyage dans ngOnDestroy(), la logique qui doit s'exécuter avant Angular détruit la directive.  */
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
