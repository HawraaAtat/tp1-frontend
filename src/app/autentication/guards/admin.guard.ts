import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../countries/shared/authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && user.realm_access && user.realm_access.roles.includes('Admin')) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

}
