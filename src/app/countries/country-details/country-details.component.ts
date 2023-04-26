import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CountryService } from '../../shared/country/country.service';
import { CountryInfo } from '../../shared/models/contryInfo';
import { Country } from '../../shared/models/country';
import jwt_decode from "jwt-decode";
import {Location} from "@angular/common";
import {AuthService} from "../../shared/authentication/auth.service";
import {NgxPermissionsService} from "ngx-permissions";

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

  isAdmin = false;

  // lightboxOpen = false;
  // currentImageIndex = 0;
  isLoading = false;



  constructor(
    private readonly route: ActivatedRoute,
    private readonly countryService: CountryService,
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private permissionsService: NgxPermissionsService
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


      // Get bordering countries
      if (this.country?.[0]?.borders) {
        this.country?.[0]?.borders.forEach((border) => {
          this.countryService.getCountryByCode(border).subscribe((countryInfo) => {
            this.borderingCountries.push(countryInfo[0]);
          });
        });
      }

      // Get images for the country
      this.isLoading = true;
      this.countryService.getImagesForCountry(cca3!).subscribe((images) => {
        this.images = images;
        this.isLoading = false
      });
    });

    const accessToken = localStorage.getItem('AccessToken');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken) as { given_name: string };
      this.username = decodedToken.given_name;
    }


    ////permission
    const user = this.authService.getUser();
    if (user && user.realm_access && user.realm_access.roles.find((role: string) => role === 'Admin')) {
      this.isAdmin = true;
      this.permissionsService.addPermission('ADMIN');
    } else {
      this.isAdmin = false;
      this.permissionsService.removePermission('ADMIN');
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
