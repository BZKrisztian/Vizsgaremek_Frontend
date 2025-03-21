import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  imports: [RouterModule, TranslateModule]
})
export class EntryComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
