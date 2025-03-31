import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
  ]
})
  export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errorMessage: string = "";
  
    constructor(
      private formbuilderLg: FormBuilder,
      private authService: AuthService,
      private router: Router,
      private snackBar: MatSnackBar
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
          if(res.user && res.user.isAdmin){
            this.router.navigate(['/overseer']);
          }else{
            this.router.navigate(['/homepage']);
          }
        },
        error: (err) => {
          // this.errorMessage = "Login failed";
          this.snackBar.open('Login failed ' + this.errorMessage, 'Close', { duration: 3000 });
          console.log(err);
          this.loginForm.reset();
        }
      }
      )
    }
  }