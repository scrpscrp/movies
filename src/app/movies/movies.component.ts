import { MoviesService } from './movies.service';
import { DataInterface } from '../core/shared/Interface/data.Interface';
import { Movie } from '../core/shared/Interface/movie.interface';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { FilterInterface } from '../core/shared/Interface/filter.interface';
import { NavigateService } from '../core/shared/services/navigate.service';


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
  isFilterShowed: boolean = false;
  filterBtnText: string = 'Show filter';
  

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
    private navigate: NavigateService,
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
            this.resetFilter();
            break;
          case 'now_playing':
            this.title = 'Now Playing';
            this.resetFilter();
            break;
          case 'upcoming':
            this.title = 'Upcoming';
            this.resetFilter();
            break;
          case 'top_rated':
            this.title = 'Top Rated';
            this.resetFilter();
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

  filter(filterValue: FilterInterface) {
    this.genresToFilter = filterValue.genres;
    this.rating = filterValue.rating;
    this.movieService
      .getFilteredMovies(this.genresToFilter, 1, this.rating)
      .pipe(take(1))
      .subscribe((movieData: DataInterface) => {
        this.filterMovies = movieData.results;
      });
  }

  showFilter() {
    this.isFilterShowed = !this.isFilterShowed;
    this.isFilterShowed ? this.filterBtnText = 'Hide filter' : this.filterBtnText = 'Show filter';
    }

  resetFilter() {
    this.filterMovies = [];
  }

  navigateToMovieDetails(movieId: number) {
    this.navigate.navigateToMovieDetails(movieId);
  }

  sortBy(headerOrder: string) {
this.headerOrder = headerOrder
  }
  
  toggleSortMenu() {
this.isSortMenuOpened = !this.isSortMenuOpened;
  }
}
