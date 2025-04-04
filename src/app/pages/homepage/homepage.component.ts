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
  hasExpiredTasks: boolean = false;

  currentUsername: string = '';


  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit() {
    this.check4TasksDueToday();

    const currentUser = this.authService.getCurrentUser()
    if(currentUser){
      this.currentUsername = currentUser.userName
    }
    }

    check4TasksDueToday(): void {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      this.hasTasksDue4Today = false;
      this.hasExpiredTasks = false;
    
      this.taskService.getTaskLists().subscribe(lists => {
        lists.forEach(list => {
          this.taskService.getTasks(list.list_Id).subscribe(tasks => {
            tasks.forEach(task => {
              if (task.task_Status === false && task.due_Date) {
                const dueDate = new Date(task.due_Date);
                dueDate.setHours(0, 0, 0, 0);
    
                if (dueDate.getTime() === today.getTime()) {
                  this.hasTasksDue4Today = true;
                } else if (dueDate.getTime() < today.getTime()) {
                  this.hasExpiredTasks = true;
                }
              }
            });
          });
        });
      });
    }

}
