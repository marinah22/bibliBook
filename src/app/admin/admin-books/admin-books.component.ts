import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { LivreService } from 'src/app/services/livre.service'
import * as $ from 'jquery';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {

  booksForm: FormGroup;
  booksSubscription: Subscription;
  books: Book[] = [];

  indexToRemove;
  indexToUpdate;
  editMode = false;

  title = 'bibliBook';
  
  totalRecords: number
  page: number = 1

 
  constructor(
    private formBuilder: FormBuilder,
    private booksService: LivreService,
    private book: LivreService
  ) {
    this.books = new Array<any>()
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
        genre: ['', Validators.required],
        auteur: ['', Validators.required],
        isbn: '',
        resume: '',
        datePublication: '',
        loc:''

      }
    )
  }
  onSubmitBooksForm() {

    const newBook: Book = this.booksForm.value;
    newBook.loc = this.booksForm.get('loc').value ? this.booksForm.get('loc').value : false;



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
  }

  onDeleteBook(index) {
    $('#deleteBookModal').modal('show');
    this.indexToRemove = index;



  }

  onConfirmDeleteBook() {
    this.booksService.deleteBook(this.indexToRemove);
    $('#deleteBookModal').modal('hide');

  }

  onEditBook(book: Book) {

    this.editMode=true;
    $('#booksFormModal').modal('show');
    this.booksForm.get('title').setValue(book.title);
    this.booksForm.get('genre').setValue(book.genre);
    this.booksForm.get('auteur').setValue(book.auteur);
    this.booksForm.get('isbn').setValue(book.isbn);
    this.booksForm.get('resume').setValue(book.resume);
    this.booksForm.get('datePublication').setValue(book.datePublication);
    this.booksForm.get('loc').setValue(book.loc);
    const index = this.books.findIndex(
      (bookEl) => {
        if (bookEl === book) {
          return true;
        }
      }
    );

    this.indexToUpdate = index;



  }


}
