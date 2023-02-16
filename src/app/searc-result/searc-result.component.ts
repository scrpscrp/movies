import { trandingInterface } from './../Interface/tranding.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../services/search.service';
import { NavigateService } from '../services/navigate.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-searc-result',
  templateUrl: './searc-result.component.html',
  styleUrls: ['./searc-result.component.scss']
})
export class SearcResultComponent implements OnInit {

  keyWords: string;
  movieResults: trandingInterface[] = [];
  noResults$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( private activeRoute: ActivatedRoute, private searchService: SearchService, private navigate: NavigateService) { }

  ngOnInit(): void {
    this.searchResults();
  }

  searchResults() {
  this.activeRoute.queryParams.subscribe((params) => {
  this.keyWords = params['value'];
  this.searchService.search(this.keyWords).subscribe((data:any) => {
  this.movieResults = data.results;
  console.log(this.movieResults);
      if (this.movieResults.length < 1) {
      this.noResults$.next(true);
      }
    })
   })
  }

  navigateToDetails(type: string, contentId: number) {
   type === 'tv' ? this.navigate.navigateToTvShowDetails(contentId):this.navigate.navigateToMovieDetails(contentId);
  }


}
