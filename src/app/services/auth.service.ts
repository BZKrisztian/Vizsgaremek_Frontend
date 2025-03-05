import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AdminUser } from '../models/adminuser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private registerURL = '';
  // private loginURL = '';
  private apiURL = '';

  private currentUser_BSub: BehaviorSubject<User|null>;
  public currentUser$ : Observable<User|null>;

  private currentAdmin_BSub: BehaviorSubject<AdminUser|null>;
  public currentAdmin$ : Observable<AdminUser|null>;


  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser_BSub = new BehaviorSubject<User|null>(
      storedUser ? JSON.parse(storedUser) : null
    )
    this.currentUser$ = this.currentUser_BSub.asObservable();

    const storedAdmin = localStorage.getItem('currentAdmin');
    this.currentAdmin_BSub = new BehaviorSubject<AdminUser|null>(
      storedAdmin ? JSON.parse(storedAdmin) : null
    )
    this.currentAdmin$ = this.currentAdmin_BSub.asObservable();
  }

  register(userData: User): Observable<any> {
    if(!userData){
      throw new Error('User data is required.');
    }
    return this.http.post<any>(`${this.apiURL}/register`, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    if(!credentials){
      throw new Error('Please enter your credentials.')
    }
    return this.http.post<any>(`${this.apiURL}/login`, credentials).pipe(
      map((res)=>{
        if(res && res.token){
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('currentUser', JSON.stringify(res.user));
          this.currentUser_BSub.next(res.user);
        }
        return res;
      })
    );
  }
  adminLogin(credentials: { username: string; password: string;}): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/adminlogin`, credentials).pipe(
      map((res) => {
        if(res && res.token){
          localStorage.setItem('authToken', res.token);
          localStorage.setItem('currentAdmin', JSON.stringify(res.adminuser));
          this.currentUser_BSub.next(res.adminuser);
        }
        return res;
      })
    );
  }
  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  getCurrentUser():User|null{
    return this.currentUser_BSub.value
  }
  getCurrentAdmin():AdminUser|null{
    return this.currentAdmin_BSub.value
  }

  saveToken(token: string): void {
     localStorage.setItem('authToken', token);
  }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    this.currentUser_BSub.next(null);
    this.currentAdmin_BSub.next(null);
  }
}
