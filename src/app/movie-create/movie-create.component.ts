import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formName: string;
  formCategory: string;
  formRating: string;
  id: number;
  errorMessage: any;
  existingBlogPost: Movie;

  constructor(
    private movieService: MovieService, 
    private formBuilder: FormBuilder, 
    private avRoute: ActivatedRoute, 
    private router: Router
  ){
    const idParam = 'id';
    this.actionType = 'Add';
    this.formName = 'name';
    this.formCategory = 'category';
    this.formRating= 'rating';
    if (this.avRoute.snapshot.params[idParam]) {
      this.id = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        id: 0,
        name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        rating: ['', [Validators.required]],
      }
    )
  }

  ngOnInit(): void {
    if (this.id > 0) {
      this.actionType = 'Edit';
      this.movieService.getMovie(this.id)
        .subscribe(data => (
          this.existingBlogPost = data,
          this.form.controls[this.formName].setValue(data.name),
          this.form.controls[this.formCategory].setValue(data.category),
          this.form.controls[this.formRating].setValue(data.rating)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let movie: Movie = {
      
        name: this.form.get(this.formName).value,
        category: this.form.get(this.formCategory).value,
        rating: this.form.get(this.formRating).value,
      };

      this.movieService.saveMovie(movie)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }

    if (this.actionType === 'Edit') {
      let movie: Movie = {
        id: this.existingBlogPost.id,
        name: this.form.get(this.formName).value,
        category: this.form.get(this.formCategory).value,
        rating: this.form.get(this.formRating).value
      };
      this.movieService.updateMovie(movie)
        .subscribe((data) => {
          this.router.navigate(['/']);
        });
    }
  }

 
  cancel() : void {
    this.router.navigate(['/']);
  }

  get name() { return this.form.get(this.formName); }
  get category() { return this.form.get(this.formCategory); }
  get rating() { return this.form.get(this.formRating); }


}
