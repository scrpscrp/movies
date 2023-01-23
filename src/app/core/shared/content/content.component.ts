import { MoviesService } from './../../../services/movies.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  
  backdrop_path :string ='';
  

  constructor( private http:HttpClient,
    private movieService:MoviesService) { }

  ngOnInit(): void {
    this.movieService.getMovieDetails().subscribe((data)=>this.backdrop_path = data.backdrop_path);
  }

}
