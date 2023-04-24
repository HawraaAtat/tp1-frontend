import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from "../../countries/shared/authentication/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const accessToken = this.authService.getAccessToken();
  //   if (accessToken && !request.url.includes('api.unsplash.com')) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });
  //   } else if (!accessToken) {
  //     this.authService.refreshToken().subscribe(
  //       (response) => {
  //         this.authService.setAccessToken(response.AccessToken);
  //         request = request.clone({
  //           setHeaders: {
  //             Authorization: `Bearer ${response.AccessToken}`
  //           }
  //         });
  //       },
  //       (error) => {
  //         this.router.navigate(['/login']);
  //       }
  //     );
  //   }
  //   return next.handle(request);
  // }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    const isAccessTokenExpired = this.authService.isAccessTokenExpired();
    if (accessToken && !isAccessTokenExpired && !request.url.includes('api.unsplash.com')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } else if (isAccessTokenExpired) {
      this.authService.refreshToken().subscribe(
        (response) => {
          this.authService.setAccessToken(response.AccessToken);
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${response.AccessToken}`
            }
          });
        },
        (error) => {
          this.router.navigate(['/login']);
        }
      );
    }
    return next.handle(request);
  }

}
