import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private registerURL = '';
  private loginURL = '';

  constructor(private http: HttpClient) {}

  register(userData: User): Observable<any> {
    return this.http.post(`${this.registerURL}/register`, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.loginURL}/login`, credentials);
  }
  adminLogin(credentials: {
    username: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.loginURL}/adminlogin`, credentials);
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
  }
}
