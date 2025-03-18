import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AdminUser } from '../models/adminuser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'https://localhost:7096/api';

  // BehaviorSubject ==> container 4 current user(be it regular or admin = separate containers used depending on user type)
  // currentXY$ ==> observable 4 current user
  private currentUser_BSub: BehaviorSubject<User|null>;
  public currentUser$ : Observable<User|null>;
  private currentAdmin_BSub: BehaviorSubject<AdminUser|null>;
  public currentAdmin$ : Observable<AdminUser|null>;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser')
    this.currentUser_BSub = new BehaviorSubject<User|null>(storedUser ? JSON.parse(storedUser) : null)
    this.currentUser$ = this.currentUser_BSub.asObservable();

    const storedAdmin = localStorage.getItem('currentAdmin')
    this.currentAdmin_BSub = new BehaviorSubject<AdminUser|null>(storedAdmin ? JSON.parse(storedAdmin) : null)
    this.currentAdmin$ = this.currentAdmin_BSub.asObservable();
  }

  //getter 4 comps+guards / returns current user
  getCurrentUser(): User|null {
    return this.currentUser_BSub.value;
  }
  getCurrentAdmin(): AdminUser|null {
    return this.currentAdmin_BSub.value
  }

  // post request for backend
  register(userData: User): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/register`, userData);
  }
  // post request for backend ==> if token is received, it is saved to localstorage,
  // and current user is set by looking at the response
  // Then, behaviour subjects are updated ==> corresponding one is updated, other one is cleared
  login(credentials:{email:string,password:string}):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/login`,credentials).pipe(
      tap((res)=>{
        if(res&&res.token){
          localStorage.setItem('authToken',res.token)
          if(res.admin){
            localStorage.setItem('currentAdmin',JSON.stringify(res.admin))
            localStorage.removeItem('currentUser')
            this.currentAdmin_BSub.next(res.admin)
            this.currentUser_BSub.next(null)
          }else if(res.user){
            localStorage.setItem('currentUser', JSON.stringify(res.user))
            localStorage.removeItem('currentAdmin')
            this.currentUser_BSub.next(res.user)
            this.currentAdmin_BSub.next(null)
          }
        }
      })
    )
  }
  // gets token from localstorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  // checks if token is present, IF yes = logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  // clears localstorage, resets/nullifies behaviour subjects
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    this.currentUser_BSub.next(null);
    this.currentAdmin_BSub.next(null);
  }

  //(C)R(U)D of Users for Overseer
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiURL}/users`)
  }
  deleteUser(user_Id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiURL}/users/${user_Id}`)
  }


}
