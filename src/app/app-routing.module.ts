import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./countries/country-list/country-list.component";
import {LoginComponent} from "./autentication/login/login.component";
import {SignupComponent} from "./autentication/signup/signup.component";
import {CountryDetailsComponent} from "./countries/country-details/country-details.component";
import {ImageUploadComponent} from "./countries/image-upload/image-upload.component";
import {AuthGuard} from "./autentication/guards/auth.guard";

const routes: Routes = [
  { path: '', component: CountryListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'countries/:cca3', component: CountryDetailsComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: ImageUploadComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
