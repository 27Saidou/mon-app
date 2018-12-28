import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /*connexion a firebase */
 constructor() {
  var config = {
    apiKey: "AIzaSyCBTLWGnFK0ooq9dsy3pKXfupI0ApSp31k",
    authDomain: "mon-appli-4aa10.firebaseapp.com",
    databaseURL: "https://mon-appli-4aa10.firebaseio.com",
    projectId: "mon-appli-4aa10",
    storageBucket: "mon-appli-4aa10.appspot.com",
    messagingSenderId: "176530608838"
  };
  firebase.initializeApp(config);
 }
}
