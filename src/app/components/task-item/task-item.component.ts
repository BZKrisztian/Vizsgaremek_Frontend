import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { taskmodel } from '../../models/task.model';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: taskmodel;
  @Output() updatedTask = new EventEmitter<taskmodel>();
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
