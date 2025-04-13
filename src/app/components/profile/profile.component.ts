import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  profileForm!: FormGroup
  userId: number = 0

  constructor(
    private FormB: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser()
    if(!user)
      return

    this.userId = user.user_Id

    this.profileForm = this.FormB.group({
      userName: [user.userName, [Validators.required, Validators.minLength(6)]],
      email: [user.email, [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: ['']
    }, {validators: this.passwordsMustMatch})
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  passwordsMustMatch(group: FormGroup) {
    const passW = group.get('password')?.value;
    const confPassW = group.get('confirmPassword')?.value;
    if (!passW && !confPassW) return null;
    return passW === confPassW ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;
  
    const { userName, email, password } = this.profileForm.value;
  
    this.authService.updateSelf({ userName, email, password })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
          this.authService.refreshCurrentUser();
        },
        error: (err) => {
          let message = 'Profile update failed';
          const backendMsg = err.error?.message;
  
          if (backendMsg === 'Username already in use') {
            message = 'The username is already taken. Please choose another.';
          } else if (backendMsg === 'Email already in use') {
            message = 'The email is already in use. Please choose another one.';
          } else if (backendMsg === 'New password must differ from the old one') {
            message = 'New password must be different from the current one.';
          }
  
          this.snackBar.open(message, 'Close', { duration: 3000 });
        }
      });
  }
  

  onClickDeleteAccount(): void {
    if (!confirm("Are you sure you want to delete your account?")) return;
    if (!confirm("This action cannot be undone. Are you sure?")) return;

    this.authService.harakiri()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBar.open("Account deleted successfully", "Close", { duration: 3000 });
          this.authService.logout();
          this.router.navigate(['/entry']);
        },
        error: (err) => {
          console.error(err);
          const message = err.error?.message || "Failed to delete account.";
          this.snackBar.open(message, "Close", { duration: 3000 });
        }
      });
  }


}
