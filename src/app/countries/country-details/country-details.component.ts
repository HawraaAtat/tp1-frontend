import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CountryService } from '../shared/country/country.service';
import { CountryInfo } from '../shared/models/contryInfo';
import { Country } from '../shared/models/country';
import jwt_decode from "jwt-decode";
import {Location} from "@angular/common";

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
  username!: string;

  // lightboxOpen = false;
  // currentImageIndex = 0;



  constructor(
    private readonly route: ActivatedRoute,
    private readonly countryService: CountryService,
    private router: Router,
    private location: Location
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  goBack() {
    this.location.back();
  }

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

    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as { given_name: string };
      this.username = decodedToken.given_name;
    }
  }

  // openLightbox(): void {
  //   this.lightboxOpen = true;
  // }
  //
  // closeLightbox(): void {
  //   this.lightboxOpen = false;
  // }

}
