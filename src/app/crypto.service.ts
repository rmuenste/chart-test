import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) { }

  getData(): Observable<string> {
    return this.http.get<string>('http://localhost:5001/api/default');
  }

  getPortfolio(): Observable<string> {
    return this.http.get<string>('http://localhost:5001/api/portfolio');
  }

}
