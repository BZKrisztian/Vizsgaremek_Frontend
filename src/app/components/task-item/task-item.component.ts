import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  imports: [
    CommonModule, TranslateModule
  ],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() updatedTask = new EventEmitter<Task>();
  @Output() deletedTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  showDates: boolean = false;

  constructor() {}


  toggleViewDate():void{
    this.showDates = !this.showDates;
  }

  completionToggle():void {
    this.task.task_Status = !this.task.task_Status;
    this.task.update_Date = new Date();
    this.updatedTask.emit(this.task);
  }

  get isExpired(): boolean {
    if (!this.task.due_Date || this.task.task_Status) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(this.task.due_Date);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }
  

  edit():void{
    this.editTask.emit(this.task);
  }

  delete():void {
    this.deletedTask.emit(this.task.task_Id);
  }
}
