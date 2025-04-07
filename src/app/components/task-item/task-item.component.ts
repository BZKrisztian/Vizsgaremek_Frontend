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

  constructor() {}

  completionToggle():void {
    this.task.task_Status = !this.task.task_Status;
    this.task.update_Date = new Date();
    this.updatedTask.emit(this.task);
  }

  edit():void{
    this.editTask.emit(this.task);
  }

  delete():void {
    this.deletedTask.emit(this.task.task_Id);
  }
}
