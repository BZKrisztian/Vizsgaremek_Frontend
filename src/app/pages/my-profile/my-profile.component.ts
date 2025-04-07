import { Component, OnInit } from '@angular/core';
import { ProfileComponent } from "../../components/profile/profile.component";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  imports: [ProfileComponent]
})
export class MyProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }



}
