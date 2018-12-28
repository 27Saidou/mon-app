import { Injectable } from '@angular/core';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  /*cette methode permet de créer un Compte */
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
}
 /*cette methode permet de se connecter */
signInUser(email: string, password: string) {
  return new Promise(
    (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    }
  );
}
/*cette methode permet de se Déconnecter */
signOutUser() {
  firebase.auth().signOut();
}
}
