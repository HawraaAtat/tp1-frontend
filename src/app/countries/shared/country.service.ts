import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {Country} from "./models/country";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private readonly http: HttpClient) { }

  getAllContries() : Observable<Country[]>  {
    const url= `${environment.baseUrl}/all`;
    return this.http.get<Country[]>(url);
  }}
