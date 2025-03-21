import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[
    RegistrationComponent, RouterModule]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
