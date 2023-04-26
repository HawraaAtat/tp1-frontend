import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import {RefreshTokenResponse} from "../models/RefreshTokenResponse";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://173.249.40.235:5005/api/User/Login()';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password });
  }

  getAccessToken(): string {
    const token = localStorage.getItem('AccessToken');
    return token ? token : '';
  }

  getRefreshToken(): string {
    const token = localStorage.getItem('RefreshToken');
    return token ? token : '';
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();
    const body = { refreshToken };
    return this.http.post<RefreshTokenResponse>('http://173.249.40.235:5005/api/User/RefreshToken()', body).pipe(
      tap((response) => {
        this.setAccessToken(response.AccessToken);
      })
    );
  }


  setAccessToken(accessToken: string): void {
    // localStorage.removeItem('AccessToken');
    localStorage.setItem('AccessToken', accessToken);
  }


  isAccessTokenExpired(): boolean {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return true;
    }
    const payload = accessToken.split('.')[1];
    const decodedPayload = atob(payload);
    const decodedToken = JSON.parse(decodedPayload);
    const expirationTime = decodedToken.exp * 1000;
    // console.log(expirationTime);
    // console.log('expirationTime',Date.now() > expirationTime);
    return Date.now() > expirationTime;
  }


  getUser(): any {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      return null;
    }
    const payload = accessToken.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }


  isLoggedIn(): Observable<boolean> {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();
    if (!accessToken && !refreshToken) {
      return of(false);
    }
    const helper = new JwtHelperService();
    const isAccessTokenExpired = accessToken ? helper.isTokenExpired(accessToken) : true;
    const isRefreshTokenExpired = refreshToken ? helper.isTokenExpired(refreshToken) : true;
    return of(!isAccessTokenExpired || !isRefreshTokenExpired);
  }

}
