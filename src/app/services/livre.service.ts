import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../interfaces/book';
import * as firebase from 'firebase';
import { FilterAuteurPipe } from 'src/app/filter-auteur.pipe';




@Injectable({
  providedIn: 'root'
})
export class LivreService {

  books : Book[] = [];
  pipe : FilterAuteurPipe ;


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
    this.books[index] = book;
    this.saveBooks();
    this.emitBooks(); 
   /*  firebase.database().ref('/books/'+index).update(book).catch(
      (error)=>{
        console.error(error);
      }
    ) */
 
  }

  uploadFile(file:File){
    return new Promise(
      (resolve,reject)=>{
        const uniqueId = Date.now().toString();
        const fileName = uniqueId + file.name;
        const upload = firebase.storage().ref().child('images/books/'+ fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log('chargement');
          },
          (error)=>{
            console.log(error);
          },
          ()=>{
            upload.snapshot.ref.getDownloadURL().then(
              (downLoadUrl)=>{
                resolve(downLoadUrl);
              }
            );

          });
      }
    )

  }

  

  
}



