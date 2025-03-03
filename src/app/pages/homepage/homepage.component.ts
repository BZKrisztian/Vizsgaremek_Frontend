import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../models/tasklist.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent, FormsModule]
})
export class HomepageComponent implements OnInit {

  
  // Remove/Refactor later, pls


  newTaskListTitle: string = '';
  newTaskListDescription: string = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
  }

  addTaskList() {
    if (this.newTaskListTitle.trim()){
      const newTaskList: TaskList = {
        list_Id: 0,
        list_Title: this.newTaskListTitle,
        list_Description: this.newTaskListDescription,
        creation_Date: new Date(),
        update_Date: new Date()
      }
      this.taskService.addTaskList(newTaskList).subscribe(
        ()=>{
          this.newTaskListTitle = '';
          this.newTaskListDescription = '';
        }
      )
    }
  }


}
