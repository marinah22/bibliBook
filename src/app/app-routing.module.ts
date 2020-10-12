import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDasboardComponent } from './admin/admin-dasboard/admin-dasboard.component';
import { HomeComponent } from './home/home.component';
import { SingleBookComponent } from './single-book/single-book.component';

const routes: Routes = [  
  {path: 'admin/dasboard', component: AdminDasboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'book/:id', component:SingleBookComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
