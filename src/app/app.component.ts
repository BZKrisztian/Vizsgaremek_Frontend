import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  currentRoute: string = '';

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router  
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.router.events.subscribe(()=>{
      this.currentRoute = this.router.url;
    })
  }
  switchLanguage(lang: string):void {
    this.translate.use(lang);
    localStorage.setItem('Language', lang);
  }

  LogInCheck():boolean{
    return this.authService.isLoggedIn();
  }
  AdminCheck():boolean{
    const user = this.authService.getCurrentUser();
    return !!user?.isAdmin;
  }

  switchPage():void{
    const targetPage = this.currentRoute.includes('overseer') ? '/homepage' : '/overseer';
    this.router.navigate([targetPage]);
  }

  logoutFromSite():void{
    this.authService.logout();
    this.router.navigate(['/entry']);
  }

}
