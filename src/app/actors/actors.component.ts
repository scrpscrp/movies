import { ActorsService } from './../services/actors.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { actorsDataInterface } from '../Interface/actors-data.interface';
import { actorsInterface } from '../Interface/actors.interface';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent implements OnInit {
  actors: actorsInterface[] = [];
  pageCount: number = 1;

  constructor(private http: HttpClient, private actorService: ActorsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getActors();
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
this.router.navigate(['/actors_details'], {queryParams: {actorsDetails: actorsId}});

  }
}
