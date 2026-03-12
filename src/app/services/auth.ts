import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'vet_auth_user';

  private readonly loggedInSubject = new BehaviorSubject<boolean>(this.hasStoredUser());
  readonly isLoggedIn$: Observable<boolean> = this.loggedInSubject.asObservable();

  private hasStoredUser(): boolean {
    try {
      return !!localStorage.getItem(this.STORAGE_KEY);
    } catch {
      return false;
    }
  }

  login(usuario: string, password: string): boolean {
    // Autenticación simulada: acepta cualquier usuario con contraseña no vacía.
    if (!usuario || !password) {
      return false;
    }

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({ usuario }));
    } catch {
      // Si falla el storage, igual consideramos sesión iniciada solo en memoria.
    }
    this.loggedInSubject.next(true);
    return true;
  }

  logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // Ignorar errores de storage.
    }
    this.loggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  getUsuarioActual(): string | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { usuario?: string };
      return parsed.usuario ?? null;
    } catch {
      return null;
    }
  }
}

