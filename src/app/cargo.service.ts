import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Interfaces
import { Cargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/cargo/'
  }

  getListCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
