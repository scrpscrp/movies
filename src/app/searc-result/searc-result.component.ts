import { TrandingInterface } from '../core/shared/Interface/tranding.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../core/shared/components/search-bar/search.service';
import { NavigateService } from '../core/shared/services/navigate.service';
import { BehaviorSubject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-searc-result',
  templateUrl: './searc-result.component.html',
  styleUrls: ['./searc-result.component.scss']
})
export class SearcResultComponent implements OnInit {

  keyWords: string;
  Results: TrandingInterface[] = [];
  noResults$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor( private activeRoute: ActivatedRoute, private searchService: SearchService, private navigate: NavigateService) { }

  ngOnInit(): void {
    this.searchResults();
  }

  searchResults() {
  this.activeRoute.queryParams.pipe(untilDestroyed(this)).subscribe((params) => {
  this.keyWords = params['value'];
  this.searchService.search(this.keyWords).subscribe((data:any) => {
  this.Results = data.results;
  console.log(this.Results);
      if (this.Results.length < 1) {
      this.noResults$.next(true);
      }
    })
   })
  }

  navigateToDetails(type: string, contentId: number) {
   type === 'tv' ? this.navigate.navigateToTvShowDetails(contentId):this.navigate.navigateToMovieDetails(contentId);
  }


}
