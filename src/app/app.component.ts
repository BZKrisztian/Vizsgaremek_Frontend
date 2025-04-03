import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

  currentRoute: string = '';
  showBackButton: boolean = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    translate.setDefaultLang('en');
    translate.use('en');

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.showBackButton =
          event.url.includes('/register') || event.url.includes('/log-in');
      }
    });
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('Language', lang);
  }

  LogInCheck(): boolean {
    return this.authService.isLoggedIn();
  }

  AdminCheck(): boolean {
    const user = this.authService.getCurrentUser();
    return !!user?.isAdmin;
  }

  switchPage(): void {
    const targetPage = this.currentRoute.includes('overseer') ? '/homepage' : '/overseer';
    this.router.navigate([targetPage]);
  }

  logoutFromSite(): void {
    this.authService.logout();
    this.router.navigate(['/entry']);
  }

  goBack(): void {
    this.location.back();
  }
}
