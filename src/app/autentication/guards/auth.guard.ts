import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of, switchMap, tap} from 'rxjs';
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
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.isLoggedIn().pipe(
  //     switchMap(isLoggedIn => {
  //       if (!isLoggedIn) {
  //         this.router.navigate(['/login']);
  //         return of(false);
  //       } else {
  //         const user = this.authService.getUser();
  //         if (user && user.realm_access && user.realm_access.roles.includes('Admin')) {
  //           return of(true);
  //         } else {
  //           this.router.navigate(['/']);
  //           return of(false);
  //         }
  //       }
  //     })
  //   );
  // }

}
