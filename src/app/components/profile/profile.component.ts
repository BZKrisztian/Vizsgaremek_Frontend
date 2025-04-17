import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
  profileForm!: FormGroup;
  userId: number = 0;

  constructor(
    private FormB: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.userId = user.user_Id;

    this.profileForm = this.FormB.group({
      userName: [user.userName, [Validators.required, Validators.minLength(6)]],
      email: [user.email, [Validators.required, Validators.email]],
      password: ['', [
        Validators.minLength(8),
        Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')
      ]],
      confirmPassword: ['']
    }, { validators: this.passwordsMustMatch });
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
    const password = this.profileForm.get('password')?.value;
    const confirm = this.profileForm.get('confirmPassword')?.value;

    if (this.profileForm.invalid) {
      if (this.profileForm.errors?.['mismatch'] && (password || confirm)) {
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

    const { userName, email } = this.profileForm.value;

    const payload: any = {
      userName: userName.trim(),
      email: email.trim()
    };

    if (password && password.length > 0) {
      payload.password = password;
    }

    this.authService.updateSelf(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.translate.get('Snackbars.ProfileUpdated').subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 3000 });
          });
          this.authService.refreshCurrentUser();
        },
        error: (err) => {
          const backendMsg: string = err.error?.message?.toLowerCase().trim() || '';
          let key = 'Errors.Generic';

          if (backendMsg.includes('username already in use')) {
            key = 'Errors.UsernameInUse';
          } else if (backendMsg.includes('email already in use')) {
            key = 'Errors.EmailInUse';
          } else if (backendMsg.includes('new password must differ')) {
            key = 'Errors.PasswordMustDiffer';
          } else if (backendMsg.includes('failed to update account')) {
            key = 'Errors.ProfileUpdateFail';
          } else if (backendMsg.includes('no changes detected')) {
            key = 'Errors.NoChangesDetected';
          }

          this.translate.get(key).subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 3000 });
          });
        }
      });
  }

  onClickDeleteAccount(): void {
    if (!confirm(this.translate.instant('Confirm.DeleteAccountStep1'))) return;
    if (!confirm(this.translate.instant('Confirm.DeleteAccountStep2'))) return;

    this.authService.harakiri()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.translate.get('Snackbars.AccountDeleted').subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 3000 });
          });
          this.authService.logout();
          this.router.navigate(['/entry']);
        },
        error: (err) => {
          const backendMsg: string = err.error?.message?.toLowerCase().trim() || '';
          let key = 'Errors.Generic';
        
          if (backendMsg.includes('admins cannot delete their own account')) {
            key = 'Errors.CannotSelfDeleteAdmin';
          } else if (backendMsg.includes('cannot delete the root admin')) {
            key = 'Errors.CannotDeleteRootAdmin';
          } else if (backendMsg.includes('only the root admin can delete users')) {
            key = 'Errors.OnlyRootCanDelete';
          }
        
          this.translate.get(key).subscribe(msg => {
            this.snackBar.open(msg, 'Close', { duration: 6000 });
          });
        }
        
      });
  }
}
