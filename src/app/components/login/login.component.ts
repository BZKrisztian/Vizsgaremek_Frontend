import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

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
  export class LoginComponent implements OnInit, OnDestroy {

    private destroy$ = new Subject<void>();

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
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    onSubmit(): void {
      if (this.loginForm.invalid) {
        this.snackBar.open('Please fill in your email and password.', 'Close', { duration: 3000 });
        return;
      }
  
      this.authService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
            if (res.user && res.user.isAdmin) {
              this.router.navigate(['/overseer']);
            } else {
              this.router.navigate(['/homepage']);
            }
          },
          error: (err) => {
            const message = err.error?.message || 'Login failed. Check your credentials.';
            this.snackBar.open(message, 'Close', { duration: 3000 });
            this.loginForm.reset();
          }
        });
    }
  }