import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';


  constructor(private translate: TranslateService){
    translate.setDefaultLang('en');
    translate.use('en');
  }
  switchLanguage(lang: string):void {
    this.translate.use(lang);
  }


}
