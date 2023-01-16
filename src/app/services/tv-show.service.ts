import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tvShowDataInterface } from '../Interface/tvShow-data.interface';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  private APIkey: string = environment.APIkey;
  private UrlTvShow: string = environment.UrlTvShow;
  private urlGenres: string = environment.urlGenres;

  constructor(private http: HttpClient) {}

  getTvShow(orderType:string, pageCount?:number): Observable<tvShowDataInterface> {
    return this.http.get<tvShowDataInterface>(
      `${this.UrlTvShow}${orderType}?${this.APIkey}&language=en-US&page=${pageCount}`
    );
  }

  getGenres():Observable<any>{
    return this.http.get(`${this.urlGenres}${this.APIkey}&language=en-US`);
  }
  // getTvShowAiringToday(): Observable<tvShowDataInterface> {
  //   return this.http.get<tvShowDataInterface>(
  //     `${this.UrlTvShow}airing_today?${this.APIkey}&language=en-US&page=1`
  //   );
  // }
  // getTvShowOnTv(): Observable<tvShowDataInterface> {
  //   return this.http.get<tvShowDataInterface>(
  //     `${this.UrlTvShow}on_the_air?${this.APIkey}&language=en-US&page=1`
  //   );
  // }
  // getTvShowTopRated(): Observable<tvShowDataInterface> {
  //   return this.http.get<tvShowDataInterface>(
  //     `${this.UrlTvShow}top_rated?${this.APIkey}&language=en-US&page=1`
  //   );
  // }
}
