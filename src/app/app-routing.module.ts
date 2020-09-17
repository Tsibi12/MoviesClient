import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';

const routes: Routes = [
  { path: '', component: MoviesComponent, pathMatch: 'full' },
  // { path: 'blogpost/:id', component: BlogPostComponent },
  { path: 'rating', component: MovieRatingComponent },
  { path: 'add', component: MovieCreateComponent },
  { path: 'movie/edit/:id', component: MovieCreateComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
