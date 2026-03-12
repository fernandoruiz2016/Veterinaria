import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
