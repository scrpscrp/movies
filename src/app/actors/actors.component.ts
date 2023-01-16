import { ActorsService } from './../services/actors.service';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs';
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

  constructor(private http: HttpClient, private actorService: ActorsService) {}

  ngOnInit(): void {
    this.getActors();
  }
  getActors() {
    this.actorService
      .getPopularActors()
      .subscribe((data: actorsDataInterface) => (this.actors = data.results));
    console.log(this.actors);
  }
  // getID() {
  //   return this.http.get('https://api.themoviedb.org/3/person/popular?api_key=7765016c9cbefc9b6bf6151ff273f4a3&language=en-US').subscribe((res)=>{
  //     console.log(res);
  //   });
  // }
  loadMore() {
    this.pageCount++;
    this.actorService
      .getPopularActors(this.pageCount)
      .subscribe((data: actorsDataInterface) => {
        this.actors.push(...data.results);
      });
  }
}
