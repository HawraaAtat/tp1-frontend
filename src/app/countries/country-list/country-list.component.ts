import { Component, OnInit } from '@angular/core';
import { CountryService } from '../shared/country/country.service';
import { Observable } from 'rxjs';
import { Country } from '../shared/models/country';
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {FilterTerms} from "../shared/models/FilterTerms";
import {AuthService} from "../shared/authentication/auth.service";

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
  filterOpen: boolean = false;

  constructor(private readonly countryService: CountryService, private readonly router: Router, private authService: AuthService) {}

  filterTerms: FilterTerms = {
    All: false,
    Africa: false,
    Americas: false,
    Asia: false,
    Europe: false,
    Oceania: false
  };

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
    if (Object.values(this.filterTerms).some(value => value)) {
      if (this.filterTerms.All) {
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
        const selectedRegions = Object.keys(this.filterTerms).filter(key => this.filterTerms[key]);
        const filteredByRegion = this.countries.filter((country) => selectedRegions.includes(country.region));
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
    this.toggleFilter();
  }

  toggleFilter(): void {
    this.filterOpen = !this.filterOpen;
    const filterButton = document.querySelector('.filter-button') as HTMLElement;
    filterButton.classList.toggle('active');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
