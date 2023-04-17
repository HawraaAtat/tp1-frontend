import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterLink, RouterOutlet} from "@angular/router";
import { CountryListComponent } from './countries/country-list/country-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CountryCardComponent } from './countries/country-card/country-card.component';
import { LoginComponent } from './autentication/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './autentication/signup/signup.component';
import { CountryDetailsComponent } from './countries/country-details/country-details.component';
import { ImageGalleryComponent } from './countries/image-gallery/image-gallery.component';
import { ImageUploadComponent } from './countries/image-upload/image-upload.component';
import {AuthService} from "./countries/shared/authentication/auth.service";
import {AuthGuard} from "./autentication/guards/auth.guard";
import {AuthInterceptor} from "./autentication/interceptor/auth.interceptor";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CountryListComponent,
    CountryCardComponent,
    LoginComponent,
    SignupComponent,
    CountryDetailsComponent,
    ImageGalleryComponent,
    ImageUploadComponent,
    NotFoundComponent
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
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
