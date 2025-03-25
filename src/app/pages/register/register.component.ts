import { Component, OnInit } from '@angular/core';
import { RegistrationComponent } from '../../components/registration/registration.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[
    RegistrationComponent, RouterModule, TranslateModule]
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
