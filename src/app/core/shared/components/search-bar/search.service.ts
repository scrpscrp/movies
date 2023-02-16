import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private APIkey: string = environment.APIkey;
  private url: string = environment.url;

  constructor(private http: HttpClient) { }

  search(keyWords:string): Observable<any> {
    return this.http.get<any>(
      `${this.url}search/multi?query=${keyWords}&${this.APIkey}`
      );
    }
}