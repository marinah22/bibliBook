import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivreService } from '../services/livre.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  books = [];
  booksSubscription: Subscription;
  photoUploading = false;
  photouploaded = false;
  photoUrl: string;


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

  
  
  page = 1;
  //count = 0;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  handlePageChange(event) {
    this.page = event;
    this.booksServices.getLivres();
    this.booksServices.emitBooks();
  }

  onUploadFile(event){
    this.photoUploading = true ;
    //console.log(event);
    this.booksServices.uploadFile(event.target.files[0]).then(
      (url:string)=>{
        this.photoUrl = url;
        this.photoUploading = false;
        this.photouploaded = true;
        setTimeout(
          ()=>{
            this.photouploaded =false;

          },5000
        );
      }
    )
  }
  

}
