import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
  imports: [
    CommonModule
  ],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() updatedTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<number>();

  constructor() {}

  completionToggle() {
    this.task.task_Status = !this.task.task_Status;
    this.updatedTask.emit(this.task);
  }

  delete() {
    this.deleteTask.emit(this.task.task_Id);
  }
}
