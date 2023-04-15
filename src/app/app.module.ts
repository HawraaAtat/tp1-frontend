import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";
import { CountryListComponent } from './countries/country-list/country-list.component';
import {HttpClientModule} from "@angular/common/http";
import { CountryCardComponent } from './countries/country-card/country-card.component';
import { LoginComponent } from './autentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './autentication/signup/signup.component';
import { CountryDetailsComponent } from './countries/country-details/country-details.component';
import { ImageGalleryComponent } from './countries/image-gallery/image-gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryCardComponent,
    LoginComponent,
    SignupComponent,
    CountryDetailsComponent,
    ImageGalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
