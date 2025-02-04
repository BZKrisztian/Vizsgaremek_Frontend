import { Component, OnInit } from '@angular/core';
import { TaskListComponent } from "../../components/task-list/task-list.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  imports: [TaskListComponent]
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
