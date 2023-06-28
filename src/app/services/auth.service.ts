import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  constructor(private oauthService: OAuthService) { }

  // ข้อมูลผู้ใช้ล่าสุด
  getCurrentAuth() {
    let local: any = localStorage.getItem('auth')
    return local;
  }

  getHeader() {
    const user = this.getCurrentAuth();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${user.token}`
      })
    };
    return this.httpOptions;
  }

  setUserAuth(auth: any) {
    localStorage.setItem('auth', JSON.stringify(auth));
  }

  logout() {
    this.oauthService.logOut();
  }
}
