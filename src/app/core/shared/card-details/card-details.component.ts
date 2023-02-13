import { DataInterface } from './../../../Interface/data.Interface';
import { Component, OnInit } from '@angular/core';
import { movieDetailsinterface } from 'src/app/Interface/movieDetails.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { TvDetailsInterface } from 'src/app/Interface/tvDetails.interface';
import { TvShowService } from 'src/app/services/tv-show.service';
import { actorsDetailsInterface } from 'src/app/Interface/actorsDetails.interface';
import { ActorsService } from 'src/app/services/actors.service';
import { actorsInterface } from 'src/app/Interface/actors.interface';
import { Movie } from 'src/app/Interface/movie.interface';
import { TvShow } from 'src/app/Interface/tvshow.interface';
import { tvShowDataInterface } from 'src/app/Interface/tvShow-data.interface';
import { movieCast } from 'src/app/Interface/movie.cast';
import { movieCredits } from 'src/app/Interface/movie.credits.interface';
import { movieCrew } from 'src/app/Interface/movie.crew';
import { KnownForInterface } from 'src/app/Interface/knownFor.interface';
import { actorsCredit } from 'src/app/Interface/actors.credit.interface';
import { actorsCast } from 'src/app/Interface/actors.cast.interface';
import { take } from 'rxjs';
import { NavigateService } from 'src/app/services/navigate.service';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  modal = false;

  id: string ='';

  details: movieDetailsinterface ;
  image:string ='';
  tvDetails: TvDetailsInterface;
  actorsDetails: actorsDetailsInterface;
  knownFor: KnownForInterface [];
  actorsInterface: actorsInterface [];
  actorsCast: actorsCast[] =[];
  similarMovies: Movie[] = [];
  similarTv: TvShow [] = [];
  movieCast: movieCast[] =[] ;
  movieCrew: movieCrew[] = [];
  actors: actorsInterface[] = [];
  type = { 
    movie : 'movie',
    tvShow : 'tvShow',
    actor: 'actor'
  };
  responsiveOptions;

  constructor(
    private moviesService: MoviesService,
    private activatedRoute: ActivatedRoute,
    private tvShowService: TvShowService,
    private actorService: ActorsService,
    private navigate: NavigateService
  ) {
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
    this.getDetails();
    this.details;
  }
  showModal() {
    this.modal = true
  }


  getDetails() {
      this.activatedRoute.queryParams.subscribe((params)=>{
        this.render(params);
        })
      }

  render(params) {
    if (params.movieDetails) {
      this.id = params.movieDetails
      this.moviesService.getMovieDetails(this.id).pipe(take(1)).subscribe((movieDetails: movieDetailsinterface)=> {
        this.details = movieDetails
        this.image = 'https://image.tmdb.org/t/p/w500' + this.details.backdrop_path;
        this.moviesService.getSimilarMovies(this.id).pipe(take(1)).subscribe((similarMovies: DataInterface) => {
          this.similarMovies = similarMovies.results;
          this.moviesService.getCastMovie(this.id).pipe(take(1)).subscribe((castMovie: movieCredits)=> {
            this.movieCast = castMovie.cast;
            this.movieCrew = castMovie.crew;
          });
        })
      });
  } else if (params.tvShowDetails) {
    this.id = params.tvShowDetails
    this.tvShowService.getTvShowDetails(this.id).pipe(take(1)).subscribe((tvData: TvDetailsInterface)=> {
      this.tvDetails = tvData
      this.image = 'https://image.tmdb.org/t/p/w500' + this.tvDetails.backdrop_path
      this.tvShowService.getSimilarTv(this.id).pipe(take(1)).subscribe((similarTv: tvShowDataInterface)=> {
        this.similarTv = similarTv.results;
        this.tvShowService.getCastTv(this.id).pipe(take(1)).subscribe((castMovie: movieCredits)=> {
          this.movieCast = castMovie.cast;
          this.movieCrew = castMovie.crew;  
        });
      })
    });} else if (params['actorsDetails']) {
      this.id = params['actorsDetails'] 
      this.actorService.getActorsDetails(this.id).pipe(take(1)).subscribe((data: actorsDetailsInterface)=> {
        this.actorsDetails = data;
        this.actorService.findDetails(this.id).pipe(take(1)).subscribe((data: actorsCredit)=> {
          this.actorsCast = data.cast;
        })
      });
     }
}  
  goToDetails(id:number, type:string) {
    if (type === 'movie') {
      this.navigate.navigateToMovieDetails(id);
    } else if (type === 'tvShow'){
      this.navigate.navigateToTvShowDetails(id);
    } else if (type === 'actor'){
      this.navigate.navigateActorDetails(id);
    } 
  }
}
