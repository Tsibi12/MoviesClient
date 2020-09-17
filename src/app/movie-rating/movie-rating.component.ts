import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { MovieService } from '../services/movie.service';
import { Movie } from '../models/movie';

import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.css']
})
export class MovieRatingComponent implements OnInit {
  data: Movie[];  
  url = 'https://localhost:5001/api/movie';  
  Names = [];  
  Rating = [];  
  barchart : any=[];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((result: Movie[]) => {  
      result.forEach(x => {  
        this.Names.push(x.name);  
        this.Rating.push(x.rating);  
      });  
      this  
      this.barchart = new Chart('canvas', {  
        type: 'bar',  
        data: {  
          labels: this.Names,  
          datasets: [  
            {  
              data: this.Rating,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              display: true ,
              
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
    });  
  }

}
