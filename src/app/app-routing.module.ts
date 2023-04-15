import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./countries/country-list/country-list.component";
import {LoginComponent} from "./autentication/login/login.component";
import {SignupComponent} from "./autentication/signup/signup.component";
import {CountryDetailsComponent} from "./countries/country-details/country-details.component";

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'countries/:cca3', component: CountryDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
