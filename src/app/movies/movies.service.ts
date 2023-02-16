import { TrailerDataInterface } from '../core/shared/Interface/trailer.data.interface';
import { MovieDetailsinterface } from '../core/shared/Interface/movieDetails.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../core/shared/Interface/data.Interface';
import { MovieCredits } from '../core/shared/Interface/movie.credits.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private APIkey: string = environment.APIkey;
  private UrlMovie: string = environment.UrlMovie;
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getMovies(orderType: string, pageCount?: number): Observable<DataInterface> {
    return this.http.get<DataInterface>(
      `${this.UrlMovie}${orderType}?${this.APIkey}&language=en-US&page=${pageCount}`
    );
  }
  
  getSimilarMovies(movieId: string): Observable<DataInterface> {
    return this.http.get<DataInterface>(
      `${this.UrlMovie}${movieId}/similar?${this.APIkey}&language=en-US`
    );
  }

  getGenre(): Observable<any> {
    return this.http.get(
      `${this.url}genre/movie/list?${this.APIkey}&language=en-US`
    );
  }

  getFilteredMovies(
    genres: string,pageCount?: number,rating?: string): Observable<DataInterface> {
    return this.http.get<DataInterface>
    (`${this.url}discover/movie?${this.APIkey}&with_genres=${genres}&vote_average.gte=${rating}&page=${pageCount}`);
  }
  
  getMovieDetails(movieId: string):Observable<MovieDetailsinterface>{
    return this.http.get<MovieDetailsinterface>(`${this.url}movie/${movieId}?${this.APIkey}`)
  }
  getCastMovie(movieId:string): Observable<MovieCredits> {
    return this.http.get<MovieCredits>(`${this.UrlMovie}${movieId}/credits?${this.APIkey}`);
  }
  getMovieTrailer(trailerId:string ): Observable<TrailerDataInterface>{
    return this.http.get<TrailerDataInterface>(`${this.UrlMovie}${trailerId}/videos?${this.APIkey}`)
  }
  
}
