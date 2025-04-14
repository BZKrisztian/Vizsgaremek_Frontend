import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { InspectUserDialogComponent } from '../dialog-comps/inspectuserdialog/inspectuserdialog.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserlistComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  regularUsers: User[] = [];
  adminUsers: User[] = [];

  searchTerm: string = '';
  errorMessage: string = '';
  usersLoaded: boolean = false;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

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
        error: err => {
          this.errorMessage = "Could not load admins.";
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
        error: err => {
          this.errorMessage = "Could not load users.";
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
        error: err => {
          this.errorMessage = "Could not refresh users.";
        }
      });
  }


  deleteUser(user_Id: number): void {
    if (confirm("Are you sure you want to delete this user?")) {
      this.authService.deleteUser(user_Id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.regularUsers = this.regularUsers.filter(user => user.user_Id !== user_Id);
            this.refreshAllUsers();
          },
          error: err => {
            this.errorMessage = "Could not delete user.";
          }
        });
    }
  }

  toggleAdminState(user_Id: number): void {
    const user = [...this.regularUsers, ...this.adminUsers].find(u => u.user_Id === user_Id);
    if (!user) return;

    const action = user.isAdmin ? 'demote' : 'promote';
    const confirmed = confirm(`Are you sure you want to ${action} this user?`);

    if (!confirmed) return;

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
          this.errorMessage = err.error?.message || "Could not toggle admin state.";
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
