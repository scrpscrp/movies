import { Movie } from 'src/app/Interface/movie.interface';
import { DataInterface } from './../../../Interface/data.Interface';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsService } from 'src/app/services/actors.service';
import { HttpClient } from '@angular/common/http';
import { TvShow } from 'src/app/Interface/tvshow.interface';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() similarTv: TvShow[] = null;
  @Input() similarMovies: Movie[] = null;

  responsiveOptions;

  constructor(private http: HttpClient, private actorService: ActorsService, private router: Router, private activatedRoute: ActivatedRoute) { 
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 2,
          numScroll: 2
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }

  ngOnInit(): void {
console.log(this.similarMovies);
  }
  navigateToMovieDetails(movieId: number) {
    this.router.navigate(['/movie_details'], {queryParams: {movieDetails: movieId}});
  }
  navigateToTvDetails(tvShowId:number) {
    // this.router.navigate(['tv_show_details'], {queryParams: {tvShowDetails: tvShowId}});
    console.log(tvShowId);
  }

}
