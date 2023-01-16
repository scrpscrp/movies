import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../Interface/data.Interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private APIkey: string = environment.APIkey;
  private UrlMovie: string = environment.UrlMovie;

  constructor(private http: HttpClient) {}

  getMovies(orderType: string, pageCount?: number): Observable<DataInterface> {
    return this.http.get<DataInterface>(
      `${this.UrlMovie}${orderType}?${this.APIkey}&language=en-US&page=${pageCount}`
    );
  }

  getGenre():Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/genre/movie/list?${this.APIkey}&language=en-US`);
  }

  getFilteredMovies(genres: string, pageCount?: number): Observable<DataInterface> {
    return this.http.get<DataInterface>(`
    https://api.themoviedb.org/3/discover/movie?${this.APIkey}&with_genres=${genres}&page=${pageCount}`);
  }
}
