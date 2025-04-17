import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InspectUserDialogComponent } from '../dialog-comps/inspectuserdialog/inspectuserdialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class UserlistComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  regularUsers: User[] = [];
  adminUsers: User[] = [];

  searchTerm: string = '';
  errorMessage: string = '';
  usersLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isAdmin(): boolean {
    return this.authService.getCurrentUser()?.isAdmin ?? false;
  }
  
  isRootAdmin(): boolean {
    const current = this.authService.getCurrentUser();
    return (
      current?.email?.trim().toLowerCase() === this.authService.getRootAdminEmail().trim().toLowerCase()
    );
  }

  loadAdmins(): void {
    this.authService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: users => {
          this.adminUsers = users.filter(user => user.isAdmin);
        },
        error: () => {
          this.translate.get('Errors.LoadAdmins').subscribe(msg => {
            this.errorMessage = msg;
          });
        }
      });
  }

  loadRegularUsers(): void {
    this.authService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: users => {
          this.regularUsers = users.filter(user => !user.isAdmin);
          this.usersLoaded = true;
        },
        error: () => {
          this.translate.get('Errors.LoadUsers').subscribe(msg => {
            this.errorMessage = msg;
          });
        }
      });
  }

  refreshAllUsers(): void {
    this.authService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: users => {
          this.adminUsers = users.filter(user => user.isAdmin);
          if (this.usersLoaded) {
            this.regularUsers = users.filter(user => !user.isAdmin);
          }
        },
        error: () => {
          this.translate.get('Errors.RefreshUsers').subscribe(msg => {
            this.errorMessage = msg;
          });
        }
      });
  }

  deleteUser(user_Id: number): void {
    const confirmMsg = this.translate.instant('Confirm.DeleteUser');
    if (!confirm(confirmMsg)) return;

    this.authService.deleteUser(user_Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.regularUsers = this.regularUsers.filter(user => user.user_Id !== user_Id);
          this.refreshAllUsers();
        },
        error: () => {
          this.translate.get('Errors.DeleteUser').subscribe(msg => {
            this.errorMessage = msg;
          });
        }
      });
  }

  toggleAdminState(user_Id: number): void {
    const user = [...this.regularUsers, ...this.adminUsers].find(u => u.user_Id === user_Id);
    if (!user) return;

    const actionKey = user.isAdmin ? 'Confirm.DemoteUser' : 'Confirm.PromoteUser';
    const confirmMsg = this.translate.instant(actionKey);
    if (!confirm(confirmMsg)) return;

    this.authService.toggleAdmin(user_Id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.refreshAllUsers();
          const currentUser = this.authService.getCurrentUser();
          if (currentUser?.user_Id === user_Id) {
            this.authService.refreshCurrentUser();
          }
        },
        error: (err) => {
          let key = 'Errors.ToggleAdmin';
          const msg = err.error?.message;
        
          if (msg === 'You cannot change your own admin status') {
            key = 'Errors.CannotSelfToggleAdmin';
          }
        
          this.translate.get(key).subscribe(translated => {
            this.errorMessage = translated;
          });
        }
      });
  }

  inspectUser(userId: number): void {
    this.dialog.open(InspectUserDialogComponent, {
      data: { userId }
    });
  }

  filteredAdmins(): User[] {
    return this.adminUsers.filter(user => this.matchesSearchTerm(user));
  }

  filteredRegularUsers(): User[] {
    return this.regularUsers.filter(user => this.matchesSearchTerm(user));
  }

  private matchesSearchTerm(user: User): boolean {
    const term = this.searchTerm.toLowerCase();
    return user.userName.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
  }
}
