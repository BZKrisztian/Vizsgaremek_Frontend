import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskList } from '../../../models/tasklist.model';
import { TaskService } from '../../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inspect-user-dialog',
  templateUrl: './inspectuserdialog.component.html',
  styleUrls: ['./inspectuserdialog.component.css'],
  imports: [CommonModule],
})
export class InspectUserDialogComponent implements OnInit {
  taskLists: TaskList[] = [];
  loading = true;
  error = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userId: number },
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasklistsForAdmin(this.data.userId)
      .subscribe({
        next: (lists) => {
          this.taskLists = lists;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Failed to load tasklists';
          this.loading = false;
        }
      });
  }
}
