import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = '';
  private loginURL = '';

constructor(private http: HttpClient) { }

register(user: User){
  return this.http.post(`${this.registerURL}`, user)
}

login(credentials:{email : string, password : string}){
  return this.http.post(`${this.loginURL}`, credentials)
}

saveToken(token: string){
  localStorage.setItem('authToken', token)
}

getToken(): string | null{
  return localStorage.getItem('authToken')
}

logout(){
  localStorage.removeItem('authToken')
}


}
