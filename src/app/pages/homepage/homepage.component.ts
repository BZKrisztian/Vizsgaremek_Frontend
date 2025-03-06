import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent, FormsModule, CommonModule]
})
export class HomepageComponent implements OnInit {

  
  // Remove/Refactor later, pls


  newTaskListTitle: string = '';
  newTaskListDescription: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  isAdmin():boolean{
    return this.authService.getCurrentAdmin() != null
  }

  goToOverseer():void{
    this.router.navigate(['/overseer']);
  }


  ngOnInit() {
  }

  // addTaskList() {
  //   if (this.newTaskListTitle.trim()){
  //     const newTaskList: TaskList = {
  //       list_Id: 0,
  //       list_Title: this.newTaskListTitle,
  //       list_Description: this.newTaskListDescription,
  //       creation_Date: new Date(),
  //       update_Date: new Date()
  //     }
  //     this.taskService.addTaskList(newTaskList).subscribe(
  //       ()=>{
  //         this.newTaskListTitle = '';
  //         this.newTaskListDescription = '';
  //       }
  //     )
  //   }
  // }


}
