import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerURL = '';
  private loginURL = '';

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<any> {
    return this.http.post<any>(`${this.registerURL}/register`, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.loginURL}/login`, credentials).pipe(
      map((res)=>{
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('adminToken', res.user.adminToken);
        return res;
      })
    );
  }
  adminLogin(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.loginURL}/adminlogin`, credentials).pipe(
      map((res) => {
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('adminToken', 'true');
        return res;
      })
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
  }
}
