import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
      private snackBar: MatSnackBar,
      private translate: TranslateService
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
        this.translate.get('Errors.LoginMissingFields').subscribe(msg => {
          this.snackBar.open(msg, 'Close', { duration: 3000 });
        });        
        return;
      }
  
      this.authService.login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            this.translate.get('Snackbars.LoginSuccess').subscribe(msg => {
              this.snackBar.open(msg, 'Close', { duration: 3000 });
            });            
            if (res.user && res.user.isAdmin) {
              this.router.navigate(['/overseer']);
            } else {
              this.router.navigate(['/homepage']);
            }
          },
          error: (err) => {
            const fallback = 'Snackbars.LoginFailed';
            let key = fallback;
            const backendMsg = err.error?.message;

            if (backendMsg === 'Invalid credentials') {
              key = 'Snackbars.LoginFailed';
            }

            this.translate.get(key).subscribe(msg => {
              this.snackBar.open(msg, 'Close', { duration: 3000 });
            });

            this.loginForm.reset();
          }
        });
    }
  }