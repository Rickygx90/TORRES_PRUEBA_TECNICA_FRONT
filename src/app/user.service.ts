import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myAppUrl: string;
  private myApiUrl: string;
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/user/'
  }

  listUser: Observable<User[]>;

  getListUsers() {
    this.listUser = this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteUser(id: number): Observable<object> {
    return this.http.delete<object>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  saveUser(user: User): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  editUser(id: number, user: User): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
  }
}
