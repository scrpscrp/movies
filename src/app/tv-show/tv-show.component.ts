import { TvShow } from './../Interface/tvshow.interface';
import { tvShowDataInterface } from '../Interface/tvShow-data.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TvShowService } from '../services/tv-show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { filterInterface } from '../Interface/filter.interface';
import { NavigateService } from '../services/navigate.service';

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
  genresToFilter: string = '';
  rating: string = '';
  headerOrder: string = '';

  isSortMenuOpened: boolean = false;
  

  constructor(
    private TvShowService: TvShowService,
    private route: ActivatedRoute,
    private navigate: NavigateService
  ) {}

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
            this.resetFilter(event);
            break;
          case 'airing_today':
            this.title = 'Airing today';
            this.resetFilter(event);
            break;
          case 'on_the_air':
            this.title = 'On Tv';
            this.resetFilter(event);
            break;
          case 'top_rated':
            this.title = 'Top Rated';
            this.resetFilter(event);
            break;
        }
        this.TvShowService.getTvShow(this.params)
          .pipe(take(1))
          .subscribe((data: tvShowDataInterface) => {
            this.tvShow = data.results;
          });
      }
    });
  }

  loadMore() {
    this.pageCount++;
    if (this.filterTvShow.length) {
      this.TvShowService.getFilteredTV(this.genresToFilter, this.pageCount)
        .pipe(take(1))
        .subscribe((data: tvShowDataInterface) => {
          this.filterTvShow.push(...data.results);
        });
    } else {
      this.TvShowService.getTvShow(this.params, this.pageCount)
        .pipe(take(1))
        .subscribe((data: tvShowDataInterface) => {
          this.tvShow.push(...data.results);
        });
    }
  }

  filter(filterData: filterInterface) {
    this.genresToFilter = filterData.genres;
    this.rating = filterData.rating;
    this.TvShowService.getFilteredTV(this.genresToFilter,1,this.rating)
      .pipe(take(1))
      .subscribe((data: tvShowDataInterface) => {
        this.filterTvShow = data.results;
      });
  }

  resetFilter(event: any) {
    this.filterTvShow = [];
  }
  navigateToTvShowDetails(tvShowId:number) {
    this.navigate.navigateToTvShowDetails(tvShowId);
  }
  sortBy(headerOrder: string) {
    this.headerOrder = headerOrder
      }
      
      toggleSortMenu() {
    this.isSortMenuOpened = !this.isSortMenuOpened;
      }
}
