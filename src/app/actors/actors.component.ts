import { ActorsService } from './actors.service';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActorsDataInterface } from '../core/shared/Interface/actors-data.interface';
import { ActorsInterface } from '../core/shared/Interface/actors.interface';
import { NavigateService } from '../core/shared/services/navigate.service';
import { SearchService } from '../core/shared/components/search-bar/search.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  actors: ActorsInterface[] = [];
  pageCount: number = 1;

  constructor(private http: HttpClient, private actorService: ActorsService, private navigate: NavigateService, private search:SearchService) {}

  ngOnInit(): void {
    this.getActors();
  }
  getActors() {
    this.actorService
      .getPopularActors()
      .pipe(untilDestroyed(this)).subscribe((data: ActorsDataInterface) => (this.actors = data.results));
  }

  loadMore() {
    this.pageCount++;
    this.actorService
      .getPopularActors(this.pageCount).pipe(untilDestroyed(this))
      .subscribe((data: ActorsDataInterface) => {
        this.actors.push(...data.results);
      });
  }
 
  navigateActorId(actorsId: number) {
    this.navigate.navigateActorDetails(actorsId);
  }
}
