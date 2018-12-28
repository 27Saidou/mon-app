import { Injectable } from '@angular/core';
import { Book } from '../models/Book.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  /*cette methode permet d'enregistrer un livres */
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
}
/*création de la methode getBook */
getBooks() {
  firebase.database().ref('/books')
    .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      }
    );
}
/*cette methode permet d'obtenir les livres */
getSingleBook(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}
constructor() {
  this.getBooks();
}
/*cette methode permet de créer un livre */
createNewBook(newBook: Book) {
  this.books.push(newBook);
  this.saveBooks();
  this.emitBooks();
}
/*cette methode permet de supprimer un livre */
removeBook(book: Book) {
  if(book.photo) {
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo supprimer avec success!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
    }
  );
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
}
/* cette methode permet d'uploader une photo*/
uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log(' fichier en chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.downloadURL);
        }
      );
    }
  );
}
}
