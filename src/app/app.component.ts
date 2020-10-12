import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(

  ) {



   /*   const firebaseConfig = {
      apiKey: "AIzaSyCa8TPlGF0VJxi-G0dCovx2_S5s23QCCpQ",
      authDomain: "mabibliotheque-2ca16.firebaseapp.com",
      databaseURL: "https://mabibliotheque-2ca16.firebaseio.com",
      projectId: "mabibliotheque-2ca16",
      storageBucket: "mabibliotheque-2ca16.appspot.com",
      messagingSenderId: "313487446948",
      appId: "1:313487446948:web:5509d49f056ee3def3a731"
    };  */

    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyBP6Bt7Po8F2-pfjcXVVGguf7TKZdMOLE8",
      authDomain: "bookinfo-5433b.firebaseapp.com",
      databaseURL: "https://bookinfo-5433b.firebaseio.com",
      projectId: "bookinfo-5433b",
      storageBucket: "bookinfo-5433b.appspot.com",
      messagingSenderId: "241588248703",
      appId: "1:241588248703:web:1ff67174788429be159f4a",
      measurementId: "G-KP0CJ8GJ37"
    };

    firebase.initializeApp(firebaseConfig);

  }






}
