import { Component, OnInit } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor() {}

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
  }
}
