import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap, tap} from 'rxjs';
import {AuthService} from "../../shared/authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.isLoggedIn().pipe(
  //     tap(isLoggedIn => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //       }
  //     })
  //   );
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(
      tap(isLoggedIn => {
        if (isLoggedIn && (state.url === '/login' || state.url === '/signup')) {
          this.router.navigate(['/']);
        } else if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }


}
