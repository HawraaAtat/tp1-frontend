import { Component, OnInit } from '@angular/core';
import { CountryService } from '../shared/country/country.service';
import { Observable } from 'rxjs';
import { Country } from '../shared/models/country';
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];
  searchTerm: string = '';
  filterTerm: string[] = [];
  username!: string;

  constructor(private readonly countryService: CountryService, private readonly router: Router) {}

  ngOnInit(): void {
    this.countryService.getAllContries().subscribe((countries) => {
      this.countries = countries;
      this.filteredCountries = countries;
    });
    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as { given_name: string };
      this.username = decodedToken.given_name;
    }
  }

  searchCountries(): void {
    if (this.searchTerm) {
      this.countryService.searchCountries(this.searchTerm).subscribe((countries) => {
        this.filteredCountries = countries;
        this.filterCountries();
      });
    } else {
      this.filteredCountries = this.countries;
      this.filterCountries();
    }
  }

  filterCountries(): void {
    if (this.filterTerm.length > 0) {
      if (this.filterTerm.includes('All')) {
        if (this.searchTerm) {
          const filteredBySearch = this.countries.filter((country) =>
            country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            country.region.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          this.filteredCountries = filteredBySearch;
        } else {
          this.filteredCountries = this.countries;
        }
      } else {
        const filteredByRegion = this.countries.filter((country) => this.filterTerm.includes(country.region));
        const filteredBySearch = filteredByRegion.filter((country) =>
          country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.filteredCountries = filteredBySearch;
      }
    } else {
      if (this.searchTerm) {
        const filteredBySearch = this.countries.filter((country) =>
          country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          country.region.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.filteredCountries = filteredBySearch;
      } else {
        this.filteredCountries = this.countries;
      }
    }
  }

  onSearch(): void {
    this.searchCountries();
  }

  onFilter(): void {
    this.filterCountries();
  }

}
