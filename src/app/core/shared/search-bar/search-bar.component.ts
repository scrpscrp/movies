import { Component, OnInit } from '@angular/core';
import { DataInterface } from 'src/app/Interface/data.Interface';
import { Movie } from 'src/app/Interface/movie.interface';
import { MoviesService } from 'src/app/services/movies.service';

interface singleMoive{
  title: string;
  id: number;
}
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})



export class SearchBarComponent implements OnInit {
  page:number = 0;
  movieArr:Movie[] = [];
  movieId: any = [];
  movieTitle: any = [];
  
  constructor(
    private getMovie: MoviesService,

  ) { }

  ngOnInit(): void {
    this.findMovie();
    console.log(this.movieId);
    console.log(this.movieTitle);
  }
  
  findMovie() {
    for ( let i = 1; i < 10; i++) {
      this.page = i;
      this.getMovie.getMovies('popular',this.page).subscribe((data: DataInterface )=> {
      data.results.forEach(item => this.movieId.push(item.id));
      data.results.forEach(item => this.movieTitle.push(item.title));
      }) 
    }
  }

  sendData(event:any) {
    console.log(event.target.value);
  }
}

