import { trailerDataInterface } from './../Interface/trailer.data.interface';
import { movieDetailsinterface } from '../Interface/movieDetails.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../Interface/data.Interface';
import { movieCredits } from '../Interface/movie.credits.interface';

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
  
  getSimilarMovies(movieId: string): Observable<DataInterface> {
    return this.http.get<DataInterface>(
      `${this.UrlMovie}${movieId}/similar?${this.APIkey}&language=en-US&page`
    );
  }

  getGenre(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/genre/movie/list?${this.APIkey}&language=en-US`
    );
  }

  getFilteredMovies(
    genres: string,pageCount?: number,rating?: string): Observable<DataInterface> {
    return this.http.get<DataInterface>
    (`https://api.themoviedb.org/3/discover/movie?${this.APIkey}&with_genres=${genres}&vote_average.gte=${rating}&page=${pageCount}`);
  }
  
  getMovieDetails(movieId: string):Observable<movieDetailsinterface>{
    return this.http.get<movieDetailsinterface>(`https://api.themoviedb.org/3/movie/${movieId}?${this.APIkey}`)
  }
  getCastMovie(movieId:string): Observable<movieCredits> {
    return this.http.get<movieCredits>(`${this.UrlMovie}${movieId}/credits?${this.APIkey}`);
  }
  getMovieTrailer(trailerId:string ): Observable<trailerDataInterface>{
    return this.http.get<trailerDataInterface>(`${this.UrlMovie}${trailerId}/videos?${this.APIkey}`)
  }
  
}
