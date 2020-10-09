import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../interfaces/book';
import * as firebase from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class LivreService {

  books : Book[] = [];
  totalRecords : number;
  page: number = 1

  booksSubject = new Subject<Book[]>();

  
  constructor() { }

  emitBooks(){
    this.booksSubject.next(this.books);
  }

  saveBooks(){
    firebase.database().ref('/books').set(this.books);
  }

  getLivres(){
  firebase.database().ref('/books').on('value',(data)=>{
    this.books = data.val() ? data.val() : [];
    
    this.emitBooks();
  })
  }

  getSingleBook(id){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/books/'+ id).once('value').then(
          (data)=>{
            resolve(data.val());
          }
        ).catch(
          (error)=>{
            reject(error);
          }
        )
      }
    )

  }

  createBook(book: Book){
    this.books.push(book);
    this.saveBooks();
    this.emitBooks();
  }

  deleteBook(index){
    this.books.splice(index,1);
    this.saveBooks();
    this.emitBooks();
  }

  updateBook(book:Book,index){
   /*  this.books[index] = book;
    this.saveBooks();
    this.emitBooks(); */
    firebase.database().ref('/books/'+index).update(book).catch(
      (error)=>{
        console.error(error);
      }
    )

  }

  
}



