import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../models/country';
import {CountryInfo} from "../models/contryInfo";


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly unsplashAccessKey = 'BVMS8xtNPHotll7a5gg2eSRQA7NAUVUAVkJEIF5iCJY';

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
    const url = `https://api.unsplash.com/search/photos?query=${cca3}&per_page=10&client_id=${this.unsplashAccessKey}`;

    return this.http.get<{ results: { urls: { regular: string }[] }[] }>(url).pipe(
      catchError((error) => {
        console.log('Error:', error);
        return throwError(error);
      }),
      map((response) => {
        return response.results.map((result) => {
          return {
            name: result.urls[0].regular,
            url: result.urls[0].regular,
          };
        });
      })
    );


  }
}
