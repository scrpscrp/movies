import { DataInterface } from '../../../shared/Interface/data.Interface';
import { Component, OnInit } from '@angular/core';
import { MovieDetailsinterface } from 'src/app/core/shared/Interface/movieDetails.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/app/movies/movies.service';
import { TvDetailsInterface } from 'src/app/core/shared/Interface/tvDetails.interface';
import { TvShowService } from 'src/app/tv-show/tv-show.service';
import { ActorsDetailsInterface } from 'src/app/core/shared/Interface/actorsDetails.interface';
import { ActorsService } from 'src/app/actors/actors.service';
import { ActorsInterface } from 'src/app/core/shared/Interface/actors.interface';
import { Movie } from 'src/app/core/shared/Interface/movie.interface';
import { TvShow } from 'src/app/core/shared/Interface/tvshow.interface';
import { TvShowDataInterface } from 'src/app/core/shared/Interface/tvShow-data.interface';
import { MovieCast } from 'src/app/core/shared/Interface/movie.cast';
import { MovieCredits } from 'src/app/core/shared/Interface/movie.credits.interface';
import { MovieCrew } from 'src/app/core/shared/Interface/movie.crew';
import { KnownForInterface } from 'src/app/core/shared/Interface/knownFor.interface';
import { ActorsCredit } from 'src/app/core/shared/Interface/actors.credit.interface';
import { ActorsCast } from 'src/app/core/shared/Interface/actors.cast.interface';
import { NavigateService } from 'src/app/core/shared/services/navigate.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  modal = false;
  id: string ='';
  details: MovieDetailsinterface ;
  image:string ='';
  tvDetails: TvDetailsInterface;
  actorsDetails: ActorsDetailsInterface;
  knownFor: KnownForInterface [];
  actorsInterface: ActorsInterface [];
  actorsCast: ActorsCast[] =[];
  similarMovies: Movie[] = [];
  similarTv: TvShow [] = [];
  movieCast: MovieCast[] =[] ;
  movieCrew: MovieCrew[] = [];
  actors: ActorsInterface[] = [];
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
  }
  showModal() {
    this.modal = true;
  }
  getDetails() {
      this.activatedRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params)=>{this.render(params)})
  }
  
  render(params) {
    if (params.movieDetails) {
      this.id = params.movieDetails
      this.moviesService.getMovieDetails(this.id).pipe(untilDestroyed(this)).subscribe((movieDetails: MovieDetailsinterface)=> {
        this.details = movieDetails
        this.image = 'https://image.tmdb.org/t/p/w500' + this.details.backdrop_path;
        this.moviesService.getSimilarMovies(this.id).pipe(untilDestroyed(this)).subscribe((similarMovies: DataInterface) => {
          this.similarMovies = similarMovies.results;
          this.moviesService.getCastMovie(this.id).pipe(untilDestroyed(this)).subscribe((castMovie: MovieCredits)=> {
            this.movieCast = castMovie.cast;
            this.movieCrew = castMovie.crew;
          });
        })
      });
  } else if (params.tvShowDetails) {
    this.id = params.tvShowDetails
    this.tvShowService.getTvShowDetails(this.id).pipe(untilDestroyed(this)).subscribe((tvData: TvDetailsInterface)=> {
      this.tvDetails = tvData
      this.image = 'https://image.tmdb.org/t/p/w500' + this.tvDetails.backdrop_path
      this.tvShowService.getSimilarTv(this.id).pipe(untilDestroyed(this)).subscribe((similarTv: TvShowDataInterface)=> {
        this.similarTv = similarTv.results;
        this.tvShowService.getCastTv(this.id).pipe(untilDestroyed(this)).subscribe((castMovie: MovieCredits)=> {
          this.movieCast = castMovie.cast;
          this.movieCrew = castMovie.crew;  
        });
      })
    });} else if (params['actorsDetails']) {
      this.id = params['actorsDetails'] 
      this.actorService.getActorsDetails(this.id).pipe(untilDestroyed(this)).subscribe((data: ActorsDetailsInterface)=> {
        this.actorsDetails = data;
        this.actorService.findDetails(this.id).pipe(untilDestroyed(this)).subscribe((data: ActorsCredit)=> {
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
