import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

// Interfaces
import { Departamento } from './departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/depa/'
  }

  getListDepas(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
