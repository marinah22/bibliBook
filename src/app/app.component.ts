import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(
  
  ){

    

    const firebaseConfig = {
      apiKey: "AIzaSyCa8TPlGF0VJxi-G0dCovx2_S5s23QCCpQ",
      authDomain: "mabibliotheque-2ca16.firebaseapp.com",
      databaseURL: "https://mabibliotheque-2ca16.firebaseio.com",
      projectId: "mabibliotheque-2ca16",
      storageBucket:"mabibliotheque-2ca16.appspot.com",
      messagingSenderId: "313487446948",
      appId: "1:313487446948:web:5509d49f056ee3def3a731"
    };

    firebase.initializeApp(firebaseConfig);

  }



  


}
