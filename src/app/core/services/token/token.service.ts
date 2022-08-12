import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly JWT_TOKEN = 'auth_data_marcai';
  constructor() {}

  setToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token.split(' ')[1]);
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  removeJwtToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
