import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './autentication/guards/auth.guard';
import { AuthInterceptor } from './autentication/interceptor/auth.interceptor';
import { LoginComponent } from './autentication/login/login.component';
import { SignupComponent } from './autentication/signup/signup.component';
import { CountryCardComponent } from './countries/country-card/country-card.component';
import { CountryDetailsComponent } from './countries/country-details/country-details.component';
import { CountryListComponent } from './countries/country-list/country-list.component';
import { ImageGalleryComponent } from './countries/image-gallery/image-gallery.component';
import { ImageUploadComponent } from './countries/image-upload/image-upload.component';
import { AuthService } from './countries/shared/authentication/auth.service';
import { reducers } from './NGRX/store';
import { RegionEffects } from './NGRX/store/region.effects';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RegionsComponent } from './NGRX/regions/regions.component';

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
    NotFoundComponent,
    UnauthorizedComponent,
    RegionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([RegionEffects]),
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
