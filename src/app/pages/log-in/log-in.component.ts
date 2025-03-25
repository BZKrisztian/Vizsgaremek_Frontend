import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  imports: [
    LoginComponent, RouterModule, TranslateModule
  ]
})
export class LogInComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
