import { Component, OnInit } from '@angular/core';
import { UserlistComponent } from "../../components/userlist/userlist.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-overseer',
  templateUrl: './overseer.component.html',
  styleUrls: ['./overseer.component.css'],
  imports: [UserlistComponent, CommonModule, FormsModule]
})
export class OverseerComponent implements OnInit {

  dailyMot: string = "";
  dailyMots: string[] = [];

  constructor() { }

  ngOnInit():void {
  }

  addDailyMot():void{
    if(this.dailyMot.trim()){
      this.dailyMots.push(this.dailyMot);
      this.dailyMot = "";
    }
  }
  removeDailyMot(index: number):void{
    this.dailyMots.splice(index, 1);
  }

}
