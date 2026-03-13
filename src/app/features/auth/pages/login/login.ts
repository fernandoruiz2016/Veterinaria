import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  usuario = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(): void {
    this.error = '';
    const ok = this.authService.login(this.usuario, this.password);
    if (ok) {
      this.router.navigate(['/']);
    } else {
      this.error = 'Credenciales inválidas. Ingrese usuario y contraseña.';
    }
  }
}