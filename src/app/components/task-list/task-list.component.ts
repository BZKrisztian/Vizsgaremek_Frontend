import { Component, OnInit } from '@angular/core';
import { taskmodel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [TaskItemComponent],
})
export class TaskListComponent implements OnInit {
  tasks: taskmodel[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskUpdate(updatedTask: taskmodel) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      this.loadTasks();
    });
  }

  onTaskDeletion(task_Id: number) {
    this.taskService.deleteTask(task_Id).subscribe(() => {
      this.loadTasks();
    });
  }
}
