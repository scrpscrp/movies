import { TvShow } from '../core/shared/Interface/tvshow.interface';
import { TvShowDataInterface } from '../core/shared/Interface/tvShow-data.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TvShowService } from './tv-show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { FilterInterface } from '../core/shared/Interface/filter.interface';
import { NavigateService } from '../core/shared/services/navigate.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  isFilterShowed: boolean = false;
  filterBtnText: string = 'Show filter';
  
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
          .pipe(untilDestroyed(this))
          .subscribe((data: TvShowDataInterface) => {
            this.tvShow = data.results;
          });
      }
    });
  }

  loadMore() {
    this.pageCount++;
    if (this.filterTvShow.length) {
      this.TvShowService.getFilteredTV(this.genresToFilter, this.pageCount)
        .pipe(untilDestroyed(this))
        .subscribe((data: TvShowDataInterface) => {
          this.filterTvShow.push(...data.results);
        });
    } else {
      this.TvShowService.getTvShow(this.params, this.pageCount)
        .pipe(untilDestroyed(this))
        .subscribe((data: TvShowDataInterface) => {
          this.tvShow.push(...data.results);
        });
    }
  }

  filter(filterData: FilterInterface) {
    this.genresToFilter = filterData.genres;
    this.rating = filterData.rating;
    this.TvShowService.getFilteredTV(this.genresToFilter,1,this.rating)
      .pipe(untilDestroyed(this))
      .subscribe((data: TvShowDataInterface) => {
        this.filterTvShow = data.results;
      });
  }

  showFilter() {
    this.isFilterShowed = !this.isFilterShowed;
    this.isFilterShowed ? this.filterBtnText = 'Hide filter' : this.filterBtnText = 'Show filter';
    }

  resetFilter() {
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
