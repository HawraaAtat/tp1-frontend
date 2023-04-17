import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../../countries/shared/authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        // console.log('isLoggedIn:', isLoggedIn);
        // console.log('access token:', this.authService.getAccessToken());
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
