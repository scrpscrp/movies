import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { untilDestroyed } from '@ngneat/until-destroy';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { SearchService } from 'src/app/core/shared/components/search-bar/search.service';
import { TrandingInterface } from 'src/app/core/shared/Interface/tranding.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  keyValue$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  selected: string;
  searched: TrandingInterface[] = [];
  items: MenuItem[] = [];

  constructor( private router : Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Movies',

        items: [
          { label: 'Popular', routerLink: '/movies' , queryParams:{order: 'popular'}},
          { label: 'Now Playing', routerLink: '/movies' , queryParams:{order: 'now_playing'}},
          { label: 'Upcoming', routerLink: '/movies', queryParams:{order: 'upcoming'} },
          { label: 'Top Rated', routerLink: '/movies', queryParams:{order: 'top_rated'} },
        ],
      },

      {
        label: 'Tv shows',
        items: [
          { label: 'Popular', routerLink: 'tv-show' , queryParams: {order: 'popular'}},
          { label: 'Airing Today', routerLink:'tv-show' ,queryParams: {order: 'airing_today'} },
          { label: 'On TV', routerLink:'tv-show', queryParams: {order: 'on_the_air'} },
          { label: 'Top Rated',routerLink:'tv-show', queryParams: {order: 'top_rated'}  },
        ],
      },
      {
        label: 'Actors',
        routerLink: '/actors',
      },
    ];
    this.emitValue();
  }

  searching(event) {
    const value = event.query;
    this.keyValue$.next(value);
  }


emitValue() {
  this.keyValue$.pipe(
    debounceTime(1000),
    untilDestroyed(this),
  ).subscribe(val => {
  if (this.keyValue$.value === null) {
    return;
  } else {
    this.getResults(val);
  }
    });
}

findMovie(value:string) {
  if (!value) {
    return ;
  }
  this.router.navigate(['/search-results'], { queryParams: { value: value}});
  console.log(value);
}

getResults(value:string) {
  this.searchService.search(value).pipe(untilDestroyed(this)).subscribe( data => {
    const filterResults = data.results.filter(item => item.title);
    this.searched = filterResults;
  } );
}
}
