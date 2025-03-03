import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskList } from '../../models/tasklist.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [TaskItemComponent,FormsModule, CommonModule],
})
export class TaskListComponent implements OnInit {
  taskLists: TaskList[] = [];
  tasks: {[taskList_Id: number]:Task[]}={};

  //ensures the task is being held for edit
  taskEditingProc: Task | null = null;
  //ensures the tasklist is being held for edit
  taskListEditingProc: TaskList | null = null;

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


  // ===Task update section===
  onTaskEdit(task:Task):void{
    this.taskEditingProc={...task};
  }
  cancelEditTask():void{
    this.taskEditingProc = null;
  }
  saveEditedTask():void{
    if(this.taskEditingProc){
      this.taskService.updateTask(this.taskEditingProc).subscribe(
        ()=>{
          this.loadTasks(this.taskEditingProc!.taskList_Id);
          this.taskEditingProc=null;
        }
      );
    }
  }
  onTaskUpdate(updatedTask: Task):void {
    this.taskService.updateTask(updatedTask).subscribe(
      ()=>{
        this.loadTasks(updatedTask.taskList_Id);
        if(this.taskEditingProc && this.taskEditingProc.task_Id==updatedTask.task_Id){
          this.taskEditingProc=null;
        }
      }
    )
  }
  // ===Task update section END===
  onTaskDeletion(list_Id: number,task_Id: number):void {
    this.taskService.deleteTask(task_Id).subscribe(
      ()=>{this.tasks[list_Id]=this.tasks[list_Id].filter(
        (task)=>task.task_Id!=task_Id
      )}
    )
  }

  // ===Tasklist update section===
  onTaskListEdit(taskList:TaskList):void{
    this.taskListEditingProc= {...taskList};
  }
  cancelTaskListEdit():void{
    this.taskListEditingProc = null;
  }
  onTaskListUpdate():void{
    if(this.taskListEditingProc){
      this.taskService.updateTaskList(this.taskListEditingProc).subscribe(
        ()=>{
          this.loadTaskLists();
          this.taskListEditingProc = null;
        }
      )
    }
  }
  // ===Tasklist update section END===
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
