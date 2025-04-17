import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { subscribeOn } from 'rxjs';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  imports:[
    CommonModule, RouterModule, TranslateModule
  ]
})
export class VerifyEmailComponent implements OnInit {

  message = ""
  success = false

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit():void{
    const token = this.route.snapshot.queryParamMap.get("token")
    if(token){
      this.http.get(`${environment.apiUrl}/verify-email?token=${token}`).subscribe({
        next: ()=>{
          this.translate.get('Texts.Pages.VerifyEmail.Success').subscribe(msg => this.message = msg);
          this.success = true
        },
        error:()=>{
          this.translate.get('Texts.Pages.VerifyEmail.Failure').subscribe(msg => this.message = msg);
        }
      })
    }else{
      this.translate.get('Texts.Pages.VerifyEmail.Failure_2').subscribe(msg => this.message = msg);
    }
  }

}
