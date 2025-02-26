import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  adminLoginForm!: FormGroup;
  errorMessage: string = "Thou shalt not pass";

  constructor(private formBuilderAdminLg: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilderAdminLg.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit():void{
    if(this.adminLoginForm.invalid){
      return
    }
    this.authService.adminLogin(this.adminLoginForm.value).subscribe(
      {
        next:(res:any)=>{
          this.authService.saveToken(res.token)
          this.router.navigate(['/overseer'])
        },
        error: (err)=>{
          console.log(err)
          this.errorMessage = "Thou wouldst seem to not belong here. Return from where thou camst."
        }
      },
    )
  }

}
