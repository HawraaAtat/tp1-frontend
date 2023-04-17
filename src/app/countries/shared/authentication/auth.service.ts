import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable, of, tap, throwError} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


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


  // refreshToken(): Observable<HttpEvent<any>> {
  //   const refreshToken = this.getRefreshToken();
  //   const body = {
  //     grant_type: 'refresh_token',
  //     refresh_token: refreshToken
  //   };
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
  //   });
  //   return this.http.post<any>(`${this.apiUrl}/token`, body, { headers }).pipe(
  //     tap((data) => {
  //       const accessToken = data.access_token;
  //       const refreshToken = data.refresh_token;
  //       localStorage.setItem('AccessToken', accessToken);
  //       localStorage.setItem('RefreshToken', refreshToken);
  //     }),
  //     map((data) => new HttpResponse({ body: data })),
  //     catchError((error) => throwError(error))
  //   );
  // }


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
