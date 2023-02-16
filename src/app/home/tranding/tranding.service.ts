import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataInterface } from '../../core/shared/Interface/data.Interface';

@Injectable({
  providedIn: 'root',
})
export class trandingService {
  private APIkey: string = environment.APIkey;
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  todayTranding(page: number):Observable<DataInterface> {
    return this.http.get<DataInterface>(`${this.url}trending/all/day?${this.APIkey}&page=${page}`);
  }
}