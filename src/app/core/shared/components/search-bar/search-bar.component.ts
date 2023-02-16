import { TrandingInterface } from '../../../shared/Interface/tranding.interface';
import { BehaviorSubject, debounceTime, concatMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/core/shared/components/search-bar/search.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})

export class SearchBarComponent implements OnInit {

  keyValue$: BehaviorSubject<string> = new BehaviorSubject<string>(null)
  selected: string;
  searched: TrandingInterface[] = [];

  constructor( private router: Router, private searchService: SearchService) { }

  searching(event) {
      const value = event.query;
      this.keyValue$.next(value);
    }

  ngOnInit(): void {
    this.emitValue();
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

