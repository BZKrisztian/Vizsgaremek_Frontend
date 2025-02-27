import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskList } from '../../models/tasklist.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [TaskItemComponent, CommonModule],
})
export class TaskListComponent implements OnInit {
  taskLists: TaskList[] = [];
  tasks: {[taskList_Id: number]:Task[]}={};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskLists();
  }

  loadTaskLists() {
    this.taskService.getTaskLists().subscribe(
      (lists)=>{
        this.taskLists=lists;
        lists.forEach(
          (list)=>{this.loadTasks(list.list_Id)}
        );
      }
    )
  }
  loadTasks(list_Id: number):void{
    this.taskService.getTasks(list_Id).subscribe(
      (tasks)=>{this.tasks[list_Id]=tasks}
    )
  }


  onTaskUpdate(updatedTask: Task):void {
    this.taskService.updateTask(updatedTask).subscribe(
      ()=>{
        this.loadTasks(updatedTask.taskList_Id);
      }
    )
  }

  onTaskDeletion(list_Id: number,task_Id: number):void {
    this.taskService.deleteTask(task_Id).subscribe(
      ()=>{this.tasks[list_Id]=this.tasks[list_Id].filter(
        (task)=>task.task_Id!=task_Id
      )}
    )
  }
  onTaskListDeletion(list_Id: number):void{
    this.taskService.Order66(list_Id).subscribe(
      ()=>{
        this.taskLists = this.taskLists.filter(
          (list)=>list.list_Id!=list_Id
        )
        delete this.tasks[list_Id];
      }
    )
  }

}
