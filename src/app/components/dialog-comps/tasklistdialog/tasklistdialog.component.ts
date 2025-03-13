import { Component, EventEmitter, Input, OnInit, Optional, Output, SimpleChanges } from '@angular/core';
import { TaskList } from '../../../models/tasklist.model';
import { Task } from '../../../models/task.model';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasklistdialog',
  templateUrl: './tasklistdialog.component.html',
  styleUrls: ['./tasklistdialog.component.css'],
  imports:[CommonModule,ReactiveFormsModule,FormsModule]
})
export class TasklistdialogComponent implements OnInit {

  @Input() taskList: TaskList | null = null
  @Output() save = new EventEmitter<TaskList>()
  @Output() cancel = new EventEmitter<void>()

  localTaskList : TaskList = {
    list_Id: 0,
    list_Title: '',
    list_Description: '',
    creation_Date: new Date(),
    update_Date: new Date(),
    tasks: []
  }

  constructor( @Optional() public dialogRef: MatDialogRef<TasklistdialogComponent>) { }

  ngOnInit():void {
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(this.taskList){
      this.localTaskList = {...this.taskList};
    }else{
      this.localTaskList = {
        list_Id: 0,
        list_Title: '',
        list_Description: '',
        creation_Date: new Date(),
        update_Date: new Date(),
        tasks: []
      }
    }
  }

  onSave():void{
    this.localTaskList.update_Date = new Date();
    if(!this.taskList){
      this.localTaskList.creation_Date = new Date()
    }
    this.save.emit(this.localTaskList);
    if(this.dialogRef){
      this.dialogRef.close();
    }
  }

  onCancel():void{
    this.cancel.emit();
  }

}
