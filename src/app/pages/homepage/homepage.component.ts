import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent, FormsModule, CommonModule, TranslateModule]
})
export class HomepageComponent implements OnInit {

  newTaskListTitle: string = '';
  newTaskListDescription: string = '';

  hasTasksDue4Today: boolean = false;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    }

  check4TasksDueToday():void{
    this.taskService.getTaskLists().subscribe(lists=>{
      lists.forEach(list=>{
        this.taskService.getTasks(list.list_Id).subscribe(tasks=>{
          tasks.forEach(task=>{
            if(task.due_Date && new Date(task.due_Date).toDateString() === new Date().toDateString()){
              this.hasTasksDue4Today = true
            }
          })
        })
      })
    })
  }



  isAdmin():boolean{
    const user = this.authService.getCurrentUser();
    return user ? user.isAdmin : false;
  }

  goToOverseer():void{
    this.router.navigate(['/overseer']);
  }




  logout(): void {
    this.authService.logout();
    this.router.navigate(['/entry']);
  }

}
