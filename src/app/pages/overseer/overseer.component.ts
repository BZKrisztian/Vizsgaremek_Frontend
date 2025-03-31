import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserlistComponent } from '../../components/userlist/userlist.component';

@Component({
  selector: 'app-overseer',
  templateUrl: './overseer.component.html',
  styleUrls: ['./overseer.component.css'],
  imports: [CommonModule, UserlistComponent]
})
export class OverseerComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  gotoHomepage(): void {
    this.router.navigate(['/homepage']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/entry']);
  }
}
