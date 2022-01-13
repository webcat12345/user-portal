import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    const url = environment.api + '/posts';
    return this.http.get<User[]>(url);
  }

  getUserById(id: number): Observable<User> {
    const url = environment.api + `/posts/${id}`;
    return this.http.get<User>(url);
  }
}
