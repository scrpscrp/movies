import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActorsDataInterface } from '../core/shared/Interface/actors-data.interface';
import { environment } from 'src/environments/environment';
import { ActorsDetailsInterface } from '../core/shared/Interface/actorsDetails.interface';
import { ActorsCredit } from '../core/shared/Interface/actors.credit.interface';
@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private APIkey: string = environment.APIkey;
  private urlActors: string = environment.UrlActors;
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getPopularActors(pageCount?:number): Observable<ActorsDataInterface> {
    return this.http.get<ActorsDataInterface>(
      `${this.urlActors}popular?${this.APIkey}&page=${pageCount}`);
  }
  getActorsDetails(actorId: string): Observable<ActorsDetailsInterface> {
    return this.http.get<ActorsDetailsInterface>(`${this.urlActors}${actorId}?${this.APIkey}`);
  }

  findDetails(actorId: string): Observable<ActorsCredit> {
    return this.http.get<ActorsCredit>(`
    ${this.url}person/${actorId}/movie_credits?${this.APIkey}`);
  }
  
}
