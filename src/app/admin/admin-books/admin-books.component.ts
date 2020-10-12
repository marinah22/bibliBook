import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LivreService } from 'src/app/services/livre.service'
import * as $ from 'jquery';
import * as _ from 'underscore';
import { Book } from 'src/app/interfaces/book';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { ElementArrayFinder } from 'protractor';
//import { FilterAuteurPipe } from 'src/app/filter-auteur.pipe';




@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  booksForm: FormGroup;
  booksSubscription: Subscription;
  //pipe:FilterAuteurPipe;
  books: Book[] = [];
  bookCount : number = 0;
  countLoue : number = 0;
  photoUploading = false;
  photouploaded = false;
  photoUrl: string;
  date ='';
  

  
  

  indexToRemove;
  indexToUpdate;
  editMode = false;

  searchName: string ='';
  searchTitle: string ='';
  

  constructor(
    private formBuilder: FormBuilder,
    private booksService: LivreService,
    //private pipeFilter : FilterAuteurPipe,
    
  ) {  
   }

  ngOnInit() {
    this.initBooksForm();
    this.booksService.booksSubject.subscribe(
      (data: Book[]) => {
        this.books = data;        
      }
      
    );
    
    this.booksService.getLivres();

    

    this.booksService.emitBooks();
    

   

    
  }

   
  

  initBooksForm() {
    this.booksForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        genre: [''],
        auteur: ['', Validators.required],
        isbn: [''],
        resume: [''],
        date: ['', Validators.required],
        loc:[''],

      }
      
    )
    
   
  }
  onSubmitBooksForm() {

    const newBook: Book = this.booksForm.value;
    newBook.loc = this.booksForm.get('loc').value ? this.booksForm.get('loc').value : false;
    newBook.photo = this.photoUrl ? this.photoUrl : '';



    if (this.editMode) {
      this.booksService.updateBook(newBook, this.indexToUpdate);

    } else {
      this.booksService.createBook(newBook);
    }

    $('#booksFormModal').modal('hide');




  }
  resetForm() {
    this.editMode= false;
    this.booksForm.reset();
    this.photoUrl = '';
  }

  onDeleteBook(index) {
    $('#deleteBookModal').modal('show');
    this.indexToRemove = index;



  }

  onConfirmDeleteBook() {
    this.booksService.deleteBook(this.indexToRemove);
    $('#deleteBookModal').modal('hide');

  }

  onEditBook(book) {

    this.editMode=true;
    $('#booksFormModal').modal('show');
    this.booksForm.get('title').setValue(book.title);
    this.booksForm.get('genre').setValue(book.genre);
    this.booksForm.get('auteur').setValue(book.auteur);
    this.booksForm.get('isbn').setValue(book.isbn);
    this.booksForm.get('resume').setValue(book.resume);
    this.booksForm.get('date').setValue(book.date);
    this.booksForm.get('loc').setValue(book.loc);
    this.photoUrl = book.photo ? book.photo : '';
    const index = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );
    console.log(index);

    this.indexToUpdate = index;



  }

  onUploadFile(event){
    this.photoUploading = true ;
    //console.log(event);
    this.booksService.uploadFile(event.target.files[0]).then(
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

  show(){
    
     $("#show").css('display','block');
     $("#showOne").css('display','none');

      
    
   
  }
  showAll(){
    $("#showOne").css('display','block');
    $("#show").css('display','none');


  }

  count(){

    
    this.bookCount = this.books.length;
  //console.log(this.books['loc'])
  //console.log(_.size(this.books));
   return this.bookCount;
   
   
 }
 IncountLoc(){
  const newBook: Book = this.booksForm.value;
 

 // console.log(this.booksService.books.find(ElementArrayFinder=>elementEventFullName ));

    
  
}
  //count = 0;
  page = 1;
  pageSize = 3;
  pageSizes = [3, 6, 9];

  handlePageChange(event) {
    this.page = event;
    this.booksService.getLivres();
    this.booksService.emitBooks();
  }

  changeValue(index){
    if(this.books[index].loc==true){
      return this.books[index].loc = false ;
    }else{
      return this.books[index].loc = true ;

    }
  }


 


}
