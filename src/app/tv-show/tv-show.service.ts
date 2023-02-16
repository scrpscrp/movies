import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TvShowDataInterface } from '../core/shared/Interface/tvShow-data.interface';
import { TvDetailsInterface } from '../core/shared/Interface/tvDetails.interface';
import { MovieCredits } from '../core/shared/Interface/movie.credits.interface';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  private APIkey: string = environment.APIkey;
  private UrlTvShow: string = environment.UrlTvShow;
  private urlGenres: string = environment.urlGenres;
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getTvShow(orderType:string, pageCount?:number): Observable<TvShowDataInterface> {
    return this.http.get<TvShowDataInterface>(
      `${this.UrlTvShow}${orderType}?${this.APIkey}&page=${pageCount}`);
  }

  getSimilarTv(tvId: string): Observable<TvShowDataInterface> {
    return this.http.get<TvShowDataInterface>(
      `${this.UrlTvShow}${tvId}/similar?${this.APIkey}`);
  }

  getGenres():Observable<any>{
    return this.http.get(`${this.urlGenres}${this.APIkey}`);
  }
  getFilteredTV(genres: string, pageCount?: number, rating?: string): Observable<TvShowDataInterface> {
    return this.http.get<TvShowDataInterface>(`
    ${this.url}discover/tv?${this.APIkey}&with_genres=${genres}&vote_average.gte=${rating}&page=${pageCount}`);
  }

  getTvShowDetails(tvId:string):Observable<TvDetailsInterface> {
    return this.http.get<TvDetailsInterface>(`${this.url}tv/${tvId}?${this.APIkey}`);
  }
  getCastTv(tvId:string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.UrlTvShow}${tvId}/credits?${this.APIkey}`);
  }
  getTvTrailer(tvId:string): Observable<any> {
    return this.http.get<any>(`${this.UrlTvShow}${tvId}/videos?${this.APIkey}`);
  }
}
