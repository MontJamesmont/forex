import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Latest } from '../shared/interfaces/latest';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  endpoint = '/api';
  latest = this.endpoint + '/latest';

  constructor(
    private http: HttpClient
  ) { }

  public getLatest = (symbols: string[]): Observable<Latest> => {
    const options = symbols ? {
      params: new HttpParams()
        .set('symbols', symbols.join())
    } : {};
    return this.http.get<Latest>(this.latest, options);
  }
}
