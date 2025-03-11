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

  private currentUser_BSub: BehaviorSubject<User|null>;
  public currentUser$ : Observable<User|null>;

  private currentAdmin_BSub: BehaviorSubject<AdminUser|null>;
  public currentAdmin$ : Observable<AdminUser|null>;

  // private adminEmails: string[] = [];
  // private adminEmailsLoaded: boolean = false;
  // private adminEmailsLoaded_BSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    // const storedUser = localStorage.getItem('currentUser');
    // this.currentUser_BSub = new BehaviorSubject<User|null>(
    //   storedUser ? JSON.parse(storedUser) : null
    // )
    // this.currentUser$ = this.currentUser_BSub.asObservable();

    // const storedAdmin = localStorage.getItem('currentAdmin');
    // this.currentAdmin_BSub = new BehaviorSubject<AdminUser|null>(
    //   storedAdmin ? JSON.parse(storedAdmin) : null
    // )
    // this.currentAdmin$ = this.currentAdmin_BSub.asObservable();
    // this.loadAdminEmails();
  }


  // private loadAdminEmails():void{
  //   this.http.get<AdminUser[]>(`${this.apiURL}/adminusers`).subscribe(
  //     (admins)=>{
  //       this.adminEmails = admins.map((admin)=>admin.adminEmail.toLowerCase())
  //       this.adminEmailsLoaded = true;
  //       this.adminEmailsLoaded_BSub.next(true);
  //     },
  //     (err)=>{
  //       console.log(err)
  //     }
  //   )
  // }
  // private loadAdminEmails_BackCheck():Observable<boolean>{
  //   if(this.adminEmailsLoaded){
  //     return of(true)
  //   }else{
  //     return this.adminEmailsLoaded_BSub.pipe(
  //       filter((loaded)=>loaded==true),
  //       take(1)
  //     )
  //   }
  // }


  register(userData: User): Observable<any> {
    // if(!userData){
    //   throw new Error('User data is required.');
    // }
    return this.http.post<any>(`${this.apiURL}/register`, userData);
  }

  // login(credentials: { email: string; password: string }): Observable<any> {
  //   if(!credentials){
  //     throw new Error("Credentials are required.");
  //   }
  //   return this.loadAdminEmails_BackCheck().pipe(
  //     switchMap(()=>{
  //       if(this.isAdminEmail(credentials.email)){
  //         return this.http.post<any>(`${this.apiURL}/adminlogin`, credentials).pipe(
  //           switchMap((res)=>{
  //             if(res&&res.token){
  //               localStorage.setItem('authToken',res.token)
  //               localStorage.setItem('currentAdmin',JSON.stringify(res.adminUser))
  //               localStorage.removeItem('currentUser')
  //               this.currentAdmin_BSub.next(res.adminUser)
  //               this.currentUser_BSub.next(null)
  //             }
  //             return of(res)
  //           })
  //         )
  //       }else{
  //         return this.http.post<any>(`${this.apiURL}/login`, credentials).pipe(
  //           switchMap((res)=>{
  //             if(res&&res.token){
  //               localStorage.setItem('authToken',res.token)
  //               localStorage.setItem('currentUser',JSON.stringify(res.user))
  //               localStorage.removeItem('currentAdmin')
  //               this.currentUser_BSub.next(res.user)
  //               this.currentAdmin_BSub.next(null)
  //             }
  //             return of(res)
  //           })
  //         )
  //       }
  //     })
  //   )
  // }
  login(credentials:{email:string,password:string}):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/login`,credentials).pipe(
      tap((res)=>{
        if(res&&res.token){
          localStorage.setItem('authToken',res.token)
          if(res.admin){
            this.currentAdmin_BSub.next(res.admin)
            this.currentUser_BSub.next(null)
          }else if(res.user){
            this.currentUser_BSub.next(res.user)
            this.currentAdmin_BSub.next(null)
          }
        }
      })
    )
  }


  // private isAdminEmail(email: string):boolean{
  //   return this.adminEmails.includes(email.toLowerCase())
  // }
  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
  // getCurrentUser():User|null{
  //   return this.currentUser_BSub.value
  // }
  // getCurrentAdmin():AdminUser|null{
  //   return this.currentAdmin_BSub.value
  // }
  // getCurrentOwner():{id:number, role: "user" | "admin"}|null{
  //   const currentUser = this.getCurrentUser();
  //   if(currentUser){
  //     return { id: currentUser.user_Id, role: "user"};
  //   }
  //   const currentAdmin = this.getCurrentAdmin();
  //   if(currentAdmin){
  //     return { id: currentAdmin.adminUser_Id, role: "admin"};
  //   }
  //   return null
  // }

  // saveToken(token: string): void {
  //    localStorage.setItem('authToken', token);
  // }


  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  logout(): void {
    localStorage.removeItem('authToken');
    // localStorage.removeItem('currentUser');
    // localStorage.removeItem('currentAdmin');
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
