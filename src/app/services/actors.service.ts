import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { actorsDataInterface } from '../Interface/actors-data.interface';
import { environment } from 'src/environments/environment';
import { actorsDetailsInterface } from '../Interface/actorsDetails.interface';
import { actorsInterface } from '../Interface/actors.interface';
import { movieCredits } from '../Interface/movie.credits.interface';
import { actorsCredit } from '../Interface/actors.credit.interface';
@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private APIkey: string = environment.APIkey;
  private urlActors: string = environment.UrlActors;


  constructor(private http: HttpClient) {}

  getPopularActors(pageCount?:number): Observable<actorsDataInterface> {
    return this.http.get<actorsDataInterface>(
      `${this.urlActors}popular?${this.APIkey}&language=en-US&page=${pageCount}`);
  }
  getActorsDetails(actorId: string): Observable<actorsDetailsInterface> {
    return this.http.get<actorsDetailsInterface>(`${this.urlActors}${actorId}?${this.APIkey}`);
  }

  findDetails(actorId: string): Observable<actorsCredit> {
    return this.http.get<actorsCredit>(`
    https://api.themoviedb.org/3/person/${actorId}/movie_credits?${this.APIkey}&language=en-US`);
  }
  
}
