import { TvShow } from './../Interface/tvshow.interface';
import { tvShowDataInterface } from '../Interface/tvShow-data.interface';

import { Movie } from '../Interface/movie.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TvShowService } from '../services/tv-show.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { formsInterface } from '../Interface/form.interface';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss'],
})
export class TvShowComponent implements OnInit {
  tvShow: TvShow[] = [];
  params: string = '';
  title: string = '';
  pageCount: number = 1;
  filterTvShow: TvShow[] = [];
  form: FormGroup;
  Data: formsInterface[] = [
    // { name:''}

    { id: 28, name: 'Action' },

    { id: 12, name: 'Adventure' },

    { id: 16, name: 'Animation' },

    { id: 35, name: 'Comedy' },

    { id: 80, name: 'Crime' },

    { id: 99, name: 'Documentary' },

    { id: 18, name: 'Drama' },

    { id: 10751, name: 'Family' },

    { id: 14, name: 'Fantasy' },

    { id: 36, name: 'History' },

    { id: 27, name: 'Horror' },

    { id: 10402, name: 'Music' },

    { id: 9648, name: 'Mystery' },

    { id: 10749, name: 'Romance' },

    { id: 878, name: 'Science Fiction' },

    { id: 10770, name: 'TV Movie' },

    { id: 53, name: 'Thriller' },

    { id: 10752, name: 'War' },

    { id: 37, name: 'Western' },
  ];

  constructor(
    private TvShowService: TvShowService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {this.form = this.fb.group({
    checkArray: this.fb.array([], [Validators.required]),
  });}

  ngOnInit(): void {
    this.checkRoute();
    this.TvShowService.getGenres().subscribe((genres) => console.log(genres));
    this.filterTvShow = this.tvShow;
  }

  checkRoute() {
    this.route.queryParams.subscribe((params) => {
      if (params['order']) {
        this.params = params['order'];
        switch (this.params) {
          case 'popular':
            this.title = 'Popular';
            this.resetFilter();
            break;
          case 'airing_today':
            this.title = 'Airing today';
            this.resetFilter();
            break;
          case 'on_the_air':
            this.title = 'On Tv';
            this.resetFilter();
            break;
          case 'top_rated':
            this.title = 'Top Rated';
            this.resetFilter();
            break;
        }
        this.TvShowService.getTvShow(this.params)
          .pipe(take(1))
          .subscribe((data: tvShowDataInterface) => {
            this.tvShow = data.results;
            console.log(this.tvShow);
          });
      }
    });
  }
  loadMore() {
    this.pageCount++;
    this.TvShowService.getTvShow(this.params, this.pageCount).subscribe(
      (data: tvShowDataInterface) => {
        this.tvShow.push(...data.results);
      }
    );
    if (this.filterTvShow.length) {
      this.filter();
    }
  }
  // filterGenres() {
  //   this.filterTvShow = this.tvShow.filter((tvshow: TvShow) =>
  //     tvshow.genre_ids.includes(35)
  //   );
  // }

  filter() {
    let genresToFilter = this.form.value;
    let genresToFilterNumber: number[] = [];
    if (genresToFilter.checkArray) {
      genresToFilterNumber = genresToFilter.checkArray.map(Number);
      this.filterTvShow = this.filterTvShow.filter((tvshow: TvShow) =>
        genresToFilterNumber.every((genreId: number) =>
          tvshow.genre_ids.includes(genreId)
        )
      );

      console.log('genresIds', genresToFilterNumber);
      console.log('filter movies', this.filterTvShow);
    }
    this.cdr.detectChanges();
  }
  resetFilter() {
    this.filterTvShow = [];
    this.form.reset();
  }
}
