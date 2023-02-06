import { MoviesService } from './../services/movies.service';
import { DataInterface } from '../Interface/data.Interface';

import { Movie } from './../Interface/movie.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formsInterface } from '../Interface/form.interface';
import { take, tap } from 'rxjs';
import { filterInterface } from '../Interface/filter.interface';



@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})

export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  filterMovies: Movie[] = [];
  genresToFilter: string = '';
  params: string = '';
  title: string = '';
  pageCount: number = 1;
  rating: string = '';
  headerOrder: string = '';

  isSortMenuOpened: boolean = false;

  // sortBy:any = [
  //   { name: 'Name'},
  //   { name: 'Popularity'},
  //   { name: 'Year'},
  // ];
  // selectedValue: string = '';



  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkCurrentRoute();
   
  }

  checkCurrentRoute() {
    this.route.queryParams.subscribe((params) => {
      if (params['order']) {
        this.params = params['order'];

        switch (this.params) {
          case 'popular':
            this.title = 'Popular Movies';
            this.resetFilter(event);
            break;
          case 'now_playing':
            this.title = 'Now Playing';
            this.resetFilter(event);
            break;
          case 'upcoming':
            this.title = 'Upcoming';
            this.resetFilter(event);
            break;
          case 'top_rated':
            this.title = 'Top Rated';
            this.resetFilter(event);
            break;
        }
        this.movieService
          .getMovies(this.params)
          .pipe(take(1))
          .subscribe((data: DataInterface) => {
            this.movies = data.results;
            console.log(this.movies);
          });
      }
    });
  }
  loadMore() {
    this.pageCount++;
    if (this.filterMovies.length) {
      this.movieService
        .getFilteredMovies(this.genresToFilter, this.pageCount, '0')
        .pipe(take(1))
        .subscribe((data: DataInterface) => {
          this.filterMovies.push(...data.results);
          console.log(data.results);
        });
    } else {
      this.movieService
        .getMovies(this.params, this.pageCount)
        .pipe(take(1))
        .subscribe((data: DataInterface) => {
          this.movies.push(...data.results);
        });
    }
  }

  filter(filterValue: filterInterface) {
    this.genresToFilter = filterValue.genres;
    this.rating = filterValue.rating;
    this.movieService
      .getFilteredMovies(this.genresToFilter, 1, this.rating)
      .pipe(take(1))
      .subscribe((movieData: DataInterface) => {
        this.filterMovies = movieData.results;
      });
  }

  resetFilter(event: any) {
    this.filterMovies = [];
  }

  navigateToMovieDetails(movieId: number) {
    this.router.navigate(['/movie_details'], {queryParams: {movieDetails: movieId}});
  }

  sortBy(headerOrder: string) {
this.headerOrder = headerOrder
  }
  
  toggleSortMenu() {
this.isSortMenuOpened = !this.isSortMenuOpened;
  }
}
