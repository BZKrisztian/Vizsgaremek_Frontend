import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
  export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errorMessage: string = "";
  
    constructor(
      private formbuilderLg: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.loginForm = this.formbuilderLg.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.invalid){
        return
      }
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          if(res.admin){
            this.router.navigate(['/overseer']);
          }else{
            this.router.navigate(['/homepage']);
          }
        },
        error: (err) => {
          this.errorMessage = "Login failed";
          console.log(err);
          this.loginForm.reset();
        }
      }
      )
    }
  }