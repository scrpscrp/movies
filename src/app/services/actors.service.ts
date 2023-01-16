import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { actorsDataInterface } from '../Interface/actors-data.interface';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  private APIkey: string = environment.APIkey;
  private urlActors: string = environment.UrlActors;

  constructor(private http: HttpClient) {}

  getPopularActors(pageCount?:number): Observable<actorsDataInterface> {
    return this.http.get<actorsDataInterface>(
      `${this.urlActors}popular?${this.APIkey}&language=en-US&page=${pageCount}`
    );
  }
}
