import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TaskService } from '../../services/task.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent, FormsModule, CommonModule, TranslateModule],
})
export class HomepageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  newTaskListTitle: string = '';
  newTaskListDescription: string = '';

  hasTasksDue4Today: boolean = false;
  hasExpiredTasks: boolean = false;
  showHomepageContent: boolean = true;

  currentUsername: string = '';

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit() {
    const savedToggle = localStorage.getItem('showHomepageContent');
    if (savedToggle !== null) {
      this.showHomepageContent = savedToggle === 'true';
    }

    this.check4TasksDueToday();

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUsername = currentUser.userName;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  check4TasksDueToday(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.hasTasksDue4Today = false;
    this.hasExpiredTasks = false;

    this.taskService
      .getTaskLists()
      .pipe(takeUntil(this.destroy$))
      .subscribe((lists) => {
        lists.forEach((list) => {
          this.taskService
            .getTasks(list.list_Id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((tasks) => {
              tasks.forEach((task) => {
                if (task.task_Status === false && task.due_Date) {
                  const dueDate = new Date(task.due_Date);
                  dueDate.setHours(0, 0, 0, 0);

                  if (dueDate.getTime() === today.getTime()) {
                    this.hasTasksDue4Today = true;
                  } else if (dueDate.getTime() < today.getTime()) {
                    this.hasExpiredTasks = true;
                  }
                }
              });
            });
        });
      });
  }

  toggleTaskListsVisibility(): void {
    this.showHomepageContent = !this.showHomepageContent;
    localStorage.setItem(
      'showHomepageContent',
      String(this.showHomepageContent)
    );
  }
}
