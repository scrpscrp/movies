import { MoviesService } from './../services/movies.service';
import { DataInterface } from '../Interface/data.Interface';

import { Movie } from './../Interface/movie.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkCurrentRoute();
    this.movieService.getGenre().subscribe((genres) => console.log(genres));
    this.filterMovies = this.movies;
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
        .getFilteredMovies(this.genresToFilter, this.pageCount)
        .pipe(take(1))
        .subscribe((data: DataInterface) => {
          this.filterMovies.push(...data.results);
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
}
