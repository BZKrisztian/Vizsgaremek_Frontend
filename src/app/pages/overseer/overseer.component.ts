import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserlistComponent } from '../../components/userlist/userlist.component';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-overseer',
  templateUrl: './overseer.component.html',
  styleUrls: ['./overseer.component.css'],
  imports: [CommonModule, UserlistComponent, TranslateModule]
})
export class OverseerComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/entry']);
  }
}
