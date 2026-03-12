import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  get isLoggedIn$() {
    return this.authService.isLoggedIn$;
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
