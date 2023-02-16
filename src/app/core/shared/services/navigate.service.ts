import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(
    private router: Router
  ) {}

  navigateActorDetails(actorsId: number) {
    this.router.navigate(['/actors_details'], {queryParams: {actorsDetails: actorsId}});
      }
  navigateToMovieDetails(movieId: number) {
        this.router.navigate(['/movie_details'], {queryParams: {movieDetails: movieId}});
      }
  navigateToTvShowDetails(tvShowId:number) {
        this.router.navigate(['tv_show_details'], {queryParams: {tvShowDetails: tvShowId}});
      }
}
