import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  template: `
  <div>
    <button (click)="changeLanguage('en')">English</button>
    <button (click)="changeLanguage('hu')">Magyar</button>
  </div>
  <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'frontend';

  darkMode: boolean = false

  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(lang: string):void {
    this.translate.use(lang);
  }
  toggleDarkMode():void{
    this.darkMode = !this.darkMode
    document.body.classList.toggle('dark-mode', this.darkMode);
  }

}
