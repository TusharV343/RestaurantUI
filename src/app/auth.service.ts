import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private role: string = '';

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      this.authenticated = true;
      this.role = 'admin';
      return true;
    } else if (username === 'user' && password === 'user123') {
      this.authenticated = true;
      this.role = 'user';
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticated = false;
    this.role = '';
  }

  getUserRole(): string {
    return this.role;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
