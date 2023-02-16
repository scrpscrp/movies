import { ActorsService } from './../services/actors.service';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { actorsDataInterface } from '../Interface/actors-data.interface';
import { actorsInterface } from '../Interface/actors.interface';
import { NavigateService } from '../services/navigate.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  actors: actorsInterface[] = [];
  pageCount: number = 1;

  constructor(private http: HttpClient, private actorService: ActorsService, private navigate: NavigateService, private search:SearchService) {}

  ngOnInit(): void {
    this.getActors();
    this.search.search('avatar').subscribe((data) => console.log(data));
  }
  getActors() {
    this.actorService
      .getPopularActors()
      .pipe(take(1)).subscribe((data: actorsDataInterface) => (this.actors = data.results));
  }

  loadMore() {
    this.pageCount++;
    this.actorService
      .getPopularActors(this.pageCount)
      .subscribe((data: actorsDataInterface) => {
        this.actors.push(...data.results);
      });
  }
 
  navigateActorId(actorsId: number) {
    this.navigate.navigateActorDetails(actorsId);
  }
}
