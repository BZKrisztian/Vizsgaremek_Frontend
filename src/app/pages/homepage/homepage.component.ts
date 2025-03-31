import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent, FormsModule, CommonModule, TranslateModule]
})
export class HomepageComponent implements OnInit {

  
  // Remove/Refactor later, pls


  newTaskListTitle: string = '';
  newTaskListDescription: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  isAdmin():boolean{
    const user = this.authService.getCurrentUser();
    return user ? user.isAdmin : false;
  }

  goToOverseer():void{
    this.router.navigate(['/overseer']);
  }


  ngOnInit() {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/entry']);
  }

}
