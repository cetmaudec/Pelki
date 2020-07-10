import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, tipo: string}>('http://localhost:2001/auth', {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('user', username);
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('tipo', result.tipo);
          return true;
        })
        
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    localStorage.removeItem('tipo');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }
}