import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../Interface/data.Interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private APIkey: string = environment.APIkey;

  constructor(private http: HttpClient) { }


  search(keyWords:string): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/multi?query=${keyWords}&${this.APIkey}`
      );
    }
}