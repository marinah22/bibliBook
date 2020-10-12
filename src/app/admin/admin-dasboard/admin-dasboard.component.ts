import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/interfaces/book';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { LivreService } from 'src/app/services/livre.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {

  booksForm: FormGroup;
  booksSubscription: Subscription;
  bookCount : number = 0;
  books: Book[] = [];

  constructor(    private formBuilder: FormBuilder,
    private booksService: LivreService,) { }

    ngOnInit() {
      
      this.booksService.booksSubject.subscribe(
        (data: Book[]) => {
          this.books = data;
          
        }
      );
      
      this.booksService.getLivres();
      this.booksService.emitBooks();

      
    }
  count(){

    
    this.bookCount = this.books.length;
  //console.log(this.books['loc'])
  //console.log(_.size(this.books));
   return this.bookCount;
   
   
 }

}
