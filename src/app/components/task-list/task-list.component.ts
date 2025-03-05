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

  newTask: Task = {
    task_Id: 0,
    taskList_Id: 0,
    task_Title: '',
    task_Description: '',
    task_Status: false,
    task_Priority: 'low',
    due_Date: undefined,
    creation_Date: new Date(),
    update_Date: new Date()
  }

  newTaskList: TaskList = {
    list_Id:0,
    list_Title:'',
    list_Description:'',
    creation_Date: new Date(),
    update_Date: new Date(),
    tasks:[]
  }

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

  // Task Creation
  createTask(list_Id:number):void{
    this.newTask.taskList_Id= list_Id;
    this.newTask.creation_Date = new Date();
    this.newTask.update_Date = new Date();
    this.taskService.addTask(this.newTask).subscribe(
      (createdTask)=>{this.loadTasks(list_Id)
        this.newTask = {
          task_Id:0,
          taskList_Id:0,
          task_Title: '',
          task_Description: '',
          task_Status: false,
          task_Priority: 'low',
          due_Date: undefined,
          creation_Date: new Date(),
          update_Date: new Date(),
        }
      }
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

  //TaskList Creation
  createTaskList():void{
    this.newTaskList.creation_Date = new Date();
    this.newTaskList.update_Date = new Date();
    this.taskService.addTaskList(this.newTaskList).subscribe(
      (createdList)=>{
        this.loadTaskLists();
        this.newTaskList = {
          list_Id:0,
          list_Title: '',
          list_Description:'',
          creation_Date: new Date(),
          update_Date: new Date(),
          tasks:[]
        }
      }
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
    if(confirm("Are you sure you want to delete this list? This will also delete all tasks within the list."))
      {this.taskService.Order66(list_Id).subscribe(
      ()=>{
        this.taskLists = this.taskLists.filter(
          (list)=>list.list_Id!=list_Id
        )
        delete this.tasks[list_Id];
      }
    )
  }
  }

}
