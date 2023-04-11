import {Component, OnInit} from '@angular/core';
import {CountryService} from "../shared/country.service";
import {Observable} from "rxjs";
import {Country} from "../shared/models/country";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit{
  countries = new Observable<Country[]>;

  constructor(private readonly countryService: CountryService) { }
  ngOnInit(): void {
    this.countries = this.countryService.getAllContries();
  }
}
