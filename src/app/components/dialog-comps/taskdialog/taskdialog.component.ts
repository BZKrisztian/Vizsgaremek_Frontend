import { Component, EventEmitter, Input, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-taskdialog',
  templateUrl: './taskdialog.component.html',
  styleUrls: ['./taskdialog.component.css'],
  imports:[
    CommonModule,ReactiveFormsModule,FormsModule,
    MatFormFieldModule,MatInputModule,MatDatepickerModule,MatNativeDateModule, TranslateModule]
})
export class TaskdialogComponent implements OnInit {

  @Input() task: Task | null = null // IF task = editing, IF nothing = creating
  @Input() taskListId: number | null = null
  @Output() save = new EventEmitter<Task>()
  @Output() cancel = new EventEmitter<void>()

  //check when testing = see if when it edits, it loads the data of the task

  constructor( @Optional() public dialogRef: MatDialogRef<TaskdialogComponent>) { }

  localTask: Task ={
    task_Id: 0,
    taskList_Id: this.taskListId||0,
    task_Title: '',
    task_Description: '',
    task_Status: false,
    task_Priority: 'low',
    due_Date: undefined,
    creation_Date: new Date(),
    update_Date: new Date(),
    color: '#ffffff'
  }

  //look up SimpleChanges a bit more
  ngOnChanges(changes: SimpleChanges): void{
    if(this.task){ //task cloning for when we edit
      this.localTask = {...this.task}
      if(!this.localTask.color){
        this.localTask.color = '#ffffff'
      }
    }else if(this.taskListId){
      this.localTask.taskList_Id = this.taskListId || 0
      this.localTask.task_Title = ''
      this.localTask.task_Description = ''
    }
  }

  ngOnInit():void {
  }


  onSave():void{
    this.localTask.update_Date = new Date();
    if(!this.task){
      this.localTask.creation_Date = new Date()
    }
    this.save.emit(this.localTask)
  }

  onCancel():void{
    this.cancel.emit();
  }
  

}
