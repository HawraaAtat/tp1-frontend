import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./countries/country-list/country-list.component";
import {LoginComponent} from "./autentication/login/login.component";
import {SignupComponent} from "./autentication/signup/signup.component";
import {CountryDetailsComponent} from "./countries/country-details/country-details.component";
import {ImageUploadComponent} from "./countries/image-upload/image-upload.component";
import {AuthGuard} from "./autentication/guards/auth.guard";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AdminGuard} from "./autentication/guards/admin.guard";
import {UnauthorizedComponent} from "./unauthorized/unauthorized.component";
import {RegionsComponent} from "./NGRX/regions/regions.component";
import {LoginRedirectGuard} from "./autentication/guards/login-redirect.guard";

const routes: Routes = [
  { path: '', component: CountryListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginRedirectGuard]},
  { path: 'signup', component: SignupComponent, canActivate: [LoginRedirectGuard]},
  { path: 'countries/:cca3', component: CountryDetailsComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: ImageUploadComponent, canActivate: [AdminGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'region', component: RegionsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
