import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';

  wallpapers = [
    { nameKey: 'Wallpapers.City', file: 'city.jpg' },
    { nameKey: 'Wallpapers.City2', file: 'city2.png' },
    { nameKey: 'Wallpapers.Monastery', file: 'monastery.jpg' },
    { nameKey: 'Wallpapers.Shore', file: 'shore.jpg' },
    { nameKey: 'Wallpapers.Waterfall', file: 'waterfall.jpg' }
  ];
  selectedWallpaper: string = 'city.jpg';

  currentRoute: string = '';
  showBackButton: boolean = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) {
    const savedLang = localStorage.getItem('Language') || 'en';
    translate.setDefaultLang('en');
    translate.use(savedLang);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        this.showBackButton =
          event.url.includes('/register') || event.url.includes('/log-in');
      }
    });

    const savedWallpaper = localStorage.getItem('selectedWallpaper');
    if (savedWallpaper) {
      this.selectedWallpaper = savedWallpaper;
      this.applyWallpaper(savedWallpaper);
    }
  }

  switchLanguage(lang: string): void {
    this.translate.use(lang);
    localStorage.setItem('Language', lang);
  }

  applyWallpaper(wallpaper: string): void {
    const path = `url('assets/images/${wallpaper}')`; // ← FIXED HERE
    document.body.style.backgroundImage = path;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
  }
  

  changeWallpaper(file: string): void {
    this.selectedWallpaper = file;
    localStorage.setItem('selectedWallpaper', file);
    this.applyWallpaper(file);
  }

  handleWallpaperChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.changeWallpaper(value);
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
    this.router.navigate(['/entry']).then(
      ()=>{location.reload()}
    );
  }

  goBack(): void {
    this.location.back();
  }
}
