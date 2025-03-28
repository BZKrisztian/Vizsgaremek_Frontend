import { Component, OnInit } from '@angular/core';
import { UserlistComponent } from "../../components/userlist/userlist.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-overseer',
  templateUrl: './overseer.component.html',
  styleUrls: ['./overseer.component.css'],
  imports: [UserlistComponent, CommonModule, FormsModule]
})
export class OverseerComponent implements OnInit {

  dailyMot: string = "";
  dailyMots: string[] = [];

  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit():void {
    const storedMots = localStorage.getItem('dailyMots')
    if(storedMots){
      this.dailyMots = JSON.parse(storedMots);
    }
  }

  gotoHomepage(){
    this.route.navigate(['/homepage']);
  }
  logout(): void {
    this.authService.logout();
    this.route.navigate(['/entry']);
  }

  addDailyMot():void{
    if(this.dailyMot.trim()){
      this.dailyMots.push(this.dailyMot);
      this.dailyMot = "";
      localStorage.setItem('dailyMots', JSON.stringify(this.dailyMots));
    }
  }
  removeDailyMot(index: number):void{
    this.dailyMots.splice(index, 1);
    localStorage.setItem('dailyMots', JSON.stringify(this.dailyMots));
  }

}
