import { Component, OnInit } from '@angular/core';
import { UserlistComponent } from "../../components/userlist/userlist.component";

@Component({
  selector: 'app-overseer',
  templateUrl: './overseer.component.html',
  styleUrls: ['./overseer.component.css'],
  imports: [UserlistComponent]
})
export class OverseerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
