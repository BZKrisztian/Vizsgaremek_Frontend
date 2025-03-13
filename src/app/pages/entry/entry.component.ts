import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RegistrationComponent } from "../../components/registration/registration.component";
import { LoginComponent } from "../../components/login/login.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css'],
  imports: [NgIf, RegistrationComponent, LoginComponent]
})
export class EntryComponent implements OnInit {
  selectedComponent: string | null = null;

  showLogin() {
    this.selectedComponent = 'login';
  }
  showRegistration() {
    this.selectedComponent = 'registration';
  }

  toggleComponent(component:string) {
    this.selectedComponent = this.selectedComponent === component ? null:component;
  }

  // @ViewChild('btnlElement') btnlElement: ElementRef | undefined;
  // @ViewChild('loginElement') loginElement: ElementRef | undefined;
  
  constructor() { 
    // this.btnlElement = document.getElementById("btn-l") as HTMLElement | null;
    // this.loginElement = document.getElementById("app-login") as HTMLElement | null;
    
    // if (this.loginElement){
    //   this.loginElement.style.display="none";
    // }
    
    // if (this.btnlElement) {
    //   this.btnlElement.addEventListener('click', this.openLogin);
    // }
  }
  
  ngOnInit() {
  }
  // openLogin(): void {
  //   if (this.loginElement){
  //     this.loginElement.nativeElement.style.display = "block";
  //     console.log("button pressed");
  //   }
  // }
}
