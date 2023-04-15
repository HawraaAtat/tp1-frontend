import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CountryService} from "../shared/country/country.service";
import {CountryInfo} from "../shared/models/contryInfo";
import {Country} from "../shared/models/country";
@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit {
  protected readonly Object = Object;
  country?: CountryInfo[] = [];
  borderingCountries: CountryInfo[] = [];
  images: { name: string; url: string }[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly countryService: CountryService
  ) {}

  ngOnInit(): void {
    const cca3 = this.route.snapshot.paramMap.get('cca3');
    this.countryService.getCountryByCode(cca3!).subscribe((country) => {
      this.country = country;
      console.log('Country:', this.country);

      // Get bordering countries
      if (this.country?.[0]?.borders) {
        this.country?.[0]?.borders.forEach((border) => {
          this.countryService.getCountryByCode(border).subscribe((countryInfo) => {
            this.borderingCountries.push(countryInfo[0]);
          });
        });
      }

      // Get images for the country
      this.countryService.getImagesForCountry(cca3!).subscribe((images) => {
        this.images = images;
        console.log('Images:', this.images);
      });

    });
  }
}
