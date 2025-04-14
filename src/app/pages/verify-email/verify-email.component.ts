import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { subscribeOn } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports:[
    CommonModule, RouterModule, TranslateModule
  ]
})
export class VerifyEmailComponent implements OnInit {

  message = "Verifying your email..."
  success = false

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit():void{
    const token = this.route.snapshot.queryParamMap.get("token")
    if(token){
      this.http.get(`${environment.apiUrl}/verify-email?token=${token}`).subscribe({
        next: ()=>{
          this.message = "Email verified successfully"
          this.success = true
        },
        error:()=>{
          this.message = "Email verification failed. Token may be invalid or expired."
        }
      })
    }else{
      this.message = "Email verification failed. Token not found."
    }
  }

}
