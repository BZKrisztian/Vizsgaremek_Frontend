import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskList } from '../../models/tasklist.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskdialogComponent } from '../dialog-comps/taskdialog/taskdialog.component';
import { TasklistdialogComponent } from "../dialog-comps/tasklistdialog/tasklistdialog.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdeldialogComponent } from '../dialog-comps/confirmdeldialog/confirmdeldialog.component';
import { SortbypriorityPipe } from '../../pipes/sortbypriority.pipe';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  imports: [TaskItemComponent, FormsModule, CommonModule,
    TaskdialogComponent, TasklistdialogComponent, SortbypriorityPipe, TranslateModule],
})
export class TaskListComponent implements OnInit {
  taskLists: TaskList[] = [];
  tasks: {[taskList_Id: number]:Task[]}={};

  showTaskDialog: boolean = false
  showTaskListDialog: boolean = false
  currentEditingTask: Task | null = null
  currentEditingTaskList: TaskList | null = null
  currentTaskListId: number | null = null

  user:any

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private auth:AuthService
  ) {}

  ngOnInit(): void {
    this.loadTaskLists();
    this.user=this.auth.getCurrentUser()
  }

  loadTaskLists():void {
    this.taskService.getTaskLists().subscribe(
      (lists:any)=>{
        this.taskLists=lists
        this.taskLists.forEach(
          list => this.loadTasks(list.list_Id)
        )
      }
    )
}
  
  loadTasks(list_Id: number):void{
    console.log(this.tasks)
    this.taskService.getTasks(list_Id).subscribe(
      (tasks)=>{
        this.tasks[list_Id]=tasks
      }
    )
    console.log(this.tasks)
  }

  // === Task Modal Methods ===
  openTaskDialog4Edit(task:Task):void{
    this.currentEditingTask=task;
    this.showTaskDialog=true
  }
  openTaskDialog4Add(taskList_Id: number):void{
    this.currentEditingTask=null;
    this.currentTaskListId=taskList_Id;
    this.showTaskDialog=true
  }
  onTaskDialogSave(task: Task):void{
    if(this.currentEditingTask){
      this.taskService.updateTask(task).subscribe(
        ()=>{
          this.loadTasks(task.taskList_Id)
          this.closeTaskDialog()
        }
      )
    }else if(this.currentTaskListId){
      task.taskList_Id = this.currentTaskListId;
      task.creation_Date = new Date();
      task.update_Date = new Date();
      task.owner_Id= this.user.id
      console.log(task)
      this.taskService.addTask(task).subscribe(
        ()=>{
          this.loadTasks(task.taskList_Id)
          this.closeTaskDialog()
        }
      )
    }
  }
  closeTaskDialog():void{
    this.currentEditingTask=null;
    this.currentTaskListId=null;
    this.showTaskDialog=false
  }

  // === TaskList Modal Methods ===
  openTaskListDialog4Edit(tasklist:TaskList):void{
    this.currentEditingTaskList=tasklist;
    this.showTaskListDialog=true
  }
  openTaskListDialog4Add():void{
    this.currentEditingTaskList=null;
    this.showTaskListDialog=true
  }
  onTaskListDialogSave(taskList:TaskList):void{
    if(this.currentEditingTaskList){
      taskList.update_Date = new Date();
      this.taskService.updateTaskList(taskList).subscribe(
        ()=>{
          this.loadTaskLists()
          this.closeTaskListDialog()
        }
      )
    }else{
      taskList.creation_Date = new Date();
      taskList.update_Date = new Date();
      this.taskService.addTaskList(taskList).subscribe(
        ()=>{
          this.loadTaskLists()
          this.closeTaskListDialog()
        }
      )
    }
  }
  closeTaskListDialog():void{
    this.currentEditingTaskList=null;
    this.showTaskListDialog=false
  }


  onTaskDeletion(list_Id: number,task_Id: number):void {
    this.taskService.deleteTask(task_Id).subscribe(
      ()=>{this.tasks[list_Id]=this.tasks[list_Id].filter(
        (task)=>task.task_Id!=task_Id
      )}
    )
  }
  onTaskListDeletion(list_Id: number):void{
    const dialogRef = this.dialog.open(ConfirmdeldialogComponent,{
      data: {
        title: 'Delete Task List',
        message: 'Are you sure you want to delete this task list?'
      }
    })
    dialogRef.afterClosed().subscribe(confirmed =>{
      if(confirmed){
        this.taskService.deleteTaskList(list_Id).subscribe(()=>{
          this.loadTaskLists()
        })
      }
    })
  }


}
