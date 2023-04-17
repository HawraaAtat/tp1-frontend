import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {AuthService} from "../../countries/shared/authentication/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const accessToken = this.authService.getAccessToken();
  //   console.log('access token:', accessToken);
  //   if (accessToken) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${accessToken}`
  //       }
  //     });
  //   }
  //   console.log('request:', request);
  //   return next.handle(request);
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    console.log('access token:', accessToken);
    if (accessToken && !request.url.includes('api.unsplash.com')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    console.log('request:', request);
    return next.handle(request);
  }

}
