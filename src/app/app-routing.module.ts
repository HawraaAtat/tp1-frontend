import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./countries/country-list/country-list.component";
import {LoginComponent} from "./autentication/login/login.component";
import {SignupComponent} from "./autentication/signup/signup.component";
import {CountryDetailsComponent} from "./countries/country-details/country-details.component";
import {ImageUploadComponent} from "./countries/image-upload/image-upload.component";

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'countries/:cca3', component: CountryDetailsComponent },
  { path: 'upload', component: ImageUploadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
