import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  books = [];
  booksSubscription: Subscription;

  constructor(
    private booksServices: LivreService
  ) { }

  
  ngOnInit() {
   this.booksSubscription= this.booksServices.booksSubject.subscribe(
      (data:any)=>{
        this.books = data;

      }
      
    );
    this.booksServices.getLivres();
    this.booksServices.emitBooks();
      
     
  }

  getLocValue(index){

    if(this.books[index].loc){
      return 'red';

    }else{
      return 'green';
    }

  }

  changeValue(index){
    if(this.books[index].loc==true){
      return this.books[index].loc = false ;
    }else{
      return this.books[index].loc = true ;

    }
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }

  

  

}
