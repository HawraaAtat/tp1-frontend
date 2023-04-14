import {Component, OnInit} from '@angular/core';
import {CountryService} from "../shared/country/country.service";
import {Observable} from "rxjs";
import {Country} from "../shared/models/country";
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit{
  countries = new Observable<Country[]>;
  username!: string;

  constructor(private readonly countryService: CountryService) { }
  ngOnInit(): void {
    this.countries = this.countryService.getAllContries();
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as { given_name: string };
      this.username = decodedToken.given_name;
    }
  }

  // ngOnInit(): void {
  //   this.countries = this.countryService.getAllContries();
  //   const accessToken = localStorage.getItem('AccessToken');
  //   const refreshToken = localStorage.getItem('RefreshToken');
  //   if (accessToken) {
  //     const decodedAccessToken = jwt_decode(accessToken) as { given_name?: string };
  //     if (decodedAccessToken.given_name) {
  //       this.username = decodedAccessToken.given_name;
  //     } else if (refreshToken) {
  //       const decodedRefreshToken = jwt_decode(refreshToken) as { given_name?: string };
  //       if (decodedRefreshToken.given_name) {
  //         this.username = decodedRefreshToken.given_name;
  //       }
  //     }
  //   }
  // }

}
