import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule
  ],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  registrationForm!: FormGroup;

  constructor(
    private formBuilderReg: FormBuilder,
    private authservice: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilderReg.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passMustMatch('password', 'confirmPassword') });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  passMustMatch(passwordKey: string, confirmPasswordKey: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.get(passwordKey);
      const confirm = formGroup.get(confirmPasswordKey);

      if (!password || !confirm) return;

      if (password.value !== confirm.value) {
        confirm.setErrors({ ...(confirm.errors || {}), mismatch: true });
      } else {
        const errors = { ...(confirm.errors || {}) };
        delete errors['mismatch'];
        confirm.setErrors(Object.keys(errors).length ? errors : null);
      }
    };
  }

  onSubmit(): void {
    const confirmControl = this.registrationForm.get('confirmPassword');

    if (this.registrationForm.invalid) {
      if (confirmControl?.hasError('mismatch')) {
        this.translate.get('Errors.PasswordMismatch').subscribe(msg => {
          this.snackBar.open(msg, 'Close', { duration: 3000 });
        });
      } else {
        this.translate.get('Errors.InvalidForm').subscribe(msg => {
          this.snackBar.open(msg, 'Close', { duration: 3000 });
        });
      }
      return;
    }

    const newUser: User = {
      user_Id: 0,
      userName: this.registrationForm.value.username.trim(),
      email: this.registrationForm.value.email.trim().toLowerCase(),
      password: this.registrationForm.value.password,
      acc_CR_D: new Date(),
      acc_UP_D: new Date(),
      isAdmin: false,
      isEmailVerified: false
    };

    this.authservice.register(newUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.translate.get('Snackbars.RegistrationSuccess').subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 3000 });
          });
          this.registrationForm.reset();
          setTimeout(() => this.router.navigate(['/entry']));
        },
        error: (err) => {
          const backendMsg = err.error?.message;
          let key = 'Errors.Generic';

          if (backendMsg === 'Email already in use') {
            key = 'Errors.EmailInUse';
          } else if (backendMsg === 'Username is already in use') {
            key = 'Errors.UsernameInUse';
          } else if (backendMsg === 'Password must be at least 8 characters with one uppercase letter and one number.') {
            key = 'Errors.InvalidPassword';
          }

          this.translate.get(key).subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 3000 });
          });
        }
      });
  }
}
