import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, map, Observable, switchMap, tap, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import {CountryInfo} from "../models/contryInfo";


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly  unsplashAccessKey = environment.unsplashAccessKey;
  photos: { name: string; url: string }[] = [];

  constructor(private readonly http: HttpClient) {}

  getAllContries(): Observable<Country[]> {
    const url = `${environment.baseUrl}/all`;
    return this.http.get<Country[]>(url);
  }

  searchCountries(name: string): Observable<Country[]> {
    const url = `${environment.baseUrl}/name/${name}`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(cca3: string): Observable<CountryInfo[]> {
    const url = `${environment.baseUrl}/alpha/${cca3}`;
    return this.http.get<CountryInfo[]>(url).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }


  getImagesForCountry(cca3: string): Observable<{ name: string; url: string }[]> {
    return this.getCountryByCode(cca3).pipe(
      switchMap((countryInfo) => {
        const countryName = countryInfo[0].name.common;
        const url = `https://api.unsplash.com/search/photos?query=${countryName}&per_page=10&client_id=${this.unsplashAccessKey}`;
        return this.http.get<{ results: { urls: { regular: string } }[] }>(url).pipe(
          catchError((error) => {
            return throwError(error);
          }),
          tap((response) => {
            console.log('Response:', response);
          }),
          map((response) => {
            return response.results.map((result) => {
              if (result.urls && result.urls.regular) {
                return {
                  name: result.urls.regular,
                  url: result.urls.regular,
                };
              } else {
                return null;
              }
            }).filter((item) => item !== null) as { name: string; url: string }[];
          })
        );
      })
    );
  }

}
