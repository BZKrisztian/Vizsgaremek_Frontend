import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from "../../components/registration/registration.component";
import { LoginComponent } from "../../components/login/login.component";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  imports: [RegistrationComponent, LoginComponent]
})
export class EntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
