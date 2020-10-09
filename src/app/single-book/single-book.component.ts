import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/book';
import { LivreService } from '../services/livre.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private booksService: LivreService

  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.booksService.getSingleBook(id).then(
      (book: Book)=>{
        this.book= book;
      }
    ).catch(
      (error)=>{
        console.error(error);
      }
    );
  }

}
