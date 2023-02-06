import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tvShowDataInterface } from '../Interface/tvShow-data.interface';
import { DataInterface } from '../Interface/data.Interface';
import { TvDetailsInterface } from '../Interface/tvDetails.interface';
import { movieCredits } from '../Interface/movie.credits.interface';

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
      `${this.UrlTvShow}${orderType}?${this.APIkey}&language=en-US&page=${pageCount}`);
  }

  getSimilarTv(tvId: string): Observable<tvShowDataInterface> {
    return this.http.get<tvShowDataInterface>(
      `${this.UrlTvShow}${tvId}/similar?${this.APIkey}&language=en-US&page`);
  }

  getGenres():Observable<any>{
    return this.http.get(`${this.urlGenres}${this.APIkey}&language=en-US`);
  }
  getFilteredTV(genres: string, pageCount?: number, rating?: string): Observable<tvShowDataInterface> {
    return this.http.get<tvShowDataInterface>(`
    https://api.themoviedb.org/3/discover/tv?${this.APIkey}&with_genres=${genres}&vote_average.gte=${rating}&page=${pageCount}`);
  }

  getTvShowDetails(tvId:string):Observable<TvDetailsInterface> {
    return this.http.get<TvDetailsInterface>(`https://api.themoviedb.org/3/tv/${tvId}?${this.APIkey}`);
  }
  getCastTv(tvId:string): Observable<movieCredits> {
    return this.http.get<movieCredits>(`${this.UrlTvShow}${tvId}/credits?${this.APIkey}`);
  }
  getTvTrailer(tvId:string): Observable<any> {
    return this.http.get<any>(`${this.UrlTvShow}${tvId}/videos?${this.APIkey}`);
  }
}
