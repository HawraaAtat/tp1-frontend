import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CountryListComponent} from "./countries/country-list/country-list.component";
import {LoginComponent} from "./autentication/login/login.component";
import {SignupComponent} from "./autentication/signup/signup.component";

const routes: Routes = [
  { path: '', component: CountryListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
