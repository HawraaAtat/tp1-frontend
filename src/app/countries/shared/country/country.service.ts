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

  constructor(private readonly http: HttpClient) {}

  getAllContries(): Observable<Country[]> {
    const url = `${environment.baseUrl}/all`;
    return this.http.get<Country[]>(url);
  }

  searchCountries(name: string): Observable<Country[]> {
    const url = `${environment.baseUrl}/name/${name}`;
    return this.http.get<Country[]>(url);
  }

  filterCountries(region: string): Observable<Country[]> {
    const url = `${environment.baseUrl}/region/${region}`;
    return this.http.get<Country[]>(url);
  }

  getCountryByCode(cca3: string): Observable<CountryInfo[]> {
    const url = `${environment.baseUrl}/alpha/${cca3}`;
    return this.http.get<CountryInfo[]>(url).pipe(
      catchError((error) => {
        console.log('Error:', error);
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
            console.log('Error:', error);
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
                console.log('Invalid result:', result);
                return null;
              }
            }).filter((item) => item !== null) as { name: string; url: string }[];
          })
        );
      })
    );
  }

  // getImagesForCountry(cca3: string): Observable<{ name: string; url: string }[]> {
  //   return this.getCountryByCode(cca3).pipe(
  //     switchMap((countryInfo) => {
  //       const countryName = countryInfo[0].name.common;
  //       const unsplashUrl = `https://api.unsplash.com/search/photos?query=${countryName}&per_page=10&client_id=${this.unsplashAccessKey}`;
  //       const adminImagesUrl = `https://your-image-hosting-service.com/images/${cca3}`;
  //       const unsplashImages$ = this.http.get<{ results: { urls: { regular: string } }[] }>(unsplashUrl).pipe(
  //         catchError((error) => {
  //           console.log('Error:', error);
  //           return throwError(error);
  //         }),
  //         map((response) => {
  //           return response.results.map((result) => {
  //             if (result.urls && result.urls.regular) {
  //               return {
  //                 name: result.urls.regular,
  //                 url: result.urls.regular,
  //               };
  //             } else {
  //               console.log('Invalid result:', result);
  //               return null;
  //             }
  //           }).filter((item) => item !== null) as { name: string; url: string }[];
  //         })
  //       );
  //       const adminImages$ = this.http.get<{ name: string; url: string }[]>(adminImagesUrl).pipe(
  //         catchError((error) => {
  //           console.log('Error:', error);
  //           return of([]);
  //         })
  //       );
  //       return forkJoin([unsplashImages$, adminImages$]).pipe(
  //         map(([unsplashImages, adminImages]) => {
  //           return [...unsplashImages, ...adminImages];
  //         })
  //       );
  //     })
  //   );
  // }



}
