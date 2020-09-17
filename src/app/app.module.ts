import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieRatingComponent } from './movie-rating/movie-rating.component';
import { MovieService } from './services/movie.service';
// import { GrdFilterPipe } from './grd-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieCreateComponent,
    MovieRatingComponent,
    // GrdFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    MovieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
