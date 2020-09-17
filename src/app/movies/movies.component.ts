import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  allMovies$: any=[];
  public searchText : string;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movies$ = this.movieService.getMovies();
    this.allMovies$ = this.movieService.getMovies();
  }

  applyFilter(filterValue: string) {
    let filterValueLower = filterValue.toLowerCase();
    if(filterValue === '' ) {
        this.movies$=this.allMovies$;
    } 
    else {
      this.movies$ = this.allMovies$.filter((movie) => movie.name.includes(filterValueLower));
    }

 }

  delete(id) {
    const ans = confirm('Do you want to delete movie with id: ' + id);
    if (ans) {
      this.movieService.deleteMovie(id).subscribe((data) => {
        this.loadMovies();
      });
    }
  }
}
