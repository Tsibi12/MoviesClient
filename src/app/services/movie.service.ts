import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Movie } from '../models/movie';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  myApiUrl: string = 'https://localhost:5001/api/movie';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {}

  // get all movies
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  // Get movie by id
  getMovie(id: number): Observable<Movie> {
      return this.http.get<Movie>(this.myApiUrl + `/${id}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Save movie if it does not exist
  saveMovie(movie): Observable<Movie> {
      return this.http.post<Movie>(this.myApiUrl, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Update movie
  updateMovie(movie): Observable<Movie> {
      return this.http.post<Movie>(this.myApiUrl, JSON.stringify(movie), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Delete movie
  deleteMovie(id: number): Observable<Movie> {
      return this.http.delete<Movie>(this.myApiUrl + `/${id}`)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  // Error log
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}