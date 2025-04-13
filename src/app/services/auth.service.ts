import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = environment.apiUrl;

  // BehaviorSubject ==> container 4 current user(be it regular or admin = separate containers used depending on user type)
  // currentXY$ ==> observable 4 current user
  private currentUser_BSub: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser_BSub = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUser_BSub.asObservable();
  }

  getRootAdminEmail(): string {
    return environment.rootAdminEmail;
  }

  getCurrentUser(): User | null {
    return this.currentUser_BSub.value;
  }

  refreshCurrentUser(): void {
    this.http.get<User>(`${this.apiURL}/users/me`).subscribe({
      next: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUser_BSub.next(user);
      },
      error: (err) => {
        if (environment.production === false) {
          console.error('Could not refresh user state', err);
        }
      },
    });
  }

  register(userData: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register`, userData).pipe(
      tap((res) => {
        if (res?.emailNotifSent && !environment.production) {
          console.log('Email notification sent.');
        }
      })
    );
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.currentUser_BSub.next(res.user);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !environment.production) {
          console.warn('Token expired or invalid. Logging out...');
        }
        this.logout();
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Language');
    localStorage.removeItem('showHomepageContent');
    localStorage.removeItem('selectedWallpaper');
    this.currentUser_BSub.next(null);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}/users`);
  }

  deleteUser(user_Id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/users/${user_Id}`);
  }

  harakiri(): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/users/self`);
  }

  toggleAdmin(user_Id: number): Observable<User> {
    return this.http.patch<User>(
      `${this.apiURL}/users/${user_Id}/toggle-admin`,
      {}
    );
  }

  updateSelf(data: { userName: string; email: string; password?: string }) {
    return this.http.patch<any>(`${this.apiURL}/users/profile`, data);
  }
}
