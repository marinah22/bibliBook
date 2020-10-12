import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AdminDasboardComponent } from './admin/admin-dasboard/admin-dasboard.component';
import { AdminBooksComponent } from './admin/admin-books/admin-books.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SingleBookComponent } from './single-book/single-book.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { LivreService } from './services/livre.service';
import { FilterPipe } from './filter.pipe';
import { FilterAuteurPipe } from './filter-auteur.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AdminDasboardComponent,
    AdminBooksComponent,
    SingleBookComponent,
    FilterPipe,
    FilterAuteurPipe
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule   
       
     
  ],
  providers: [LivreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
