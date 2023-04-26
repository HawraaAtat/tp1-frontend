import { Component, Input, OnInit } from '@angular/core';
import { addCountry } from '../store/region.actions';
import {AppState, selectCountries} from '../store';
import { select, Store } from '@ngrx/store';
import {map, Observable, take} from 'rxjs';
import {Country} from "../../shared/models/country";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionsComponent implements OnInit {
  @Input() region!: string;
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  countries$!: Observable<Country[]>;

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.countries$ = this.http
      .get<Country[]>('https://restcountries.com/v3.1/all')
      .pipe(map((countries) => countries.filter((c) => c.region === this.region)));
    console.log(this.countries$)
  }

  isSelected(): boolean {
    // TODO: Implement isSelected method
    return false;
  }

  onDragStart(event: DragEvent, countryName: string): void {
    event.dataTransfer?.setData('text/plain', countryName);
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const countryName = event.dataTransfer?.getData('text/plain');
    if (countryName) {
      this.countries$.pipe(take(1)).subscribe((countries) => {
        const existingCountry = countries.find(
          (c) => c.name.common === countryName && c.region === this.region
        );
        if (!existingCountry) {
          this.store.dispatch(
            addCountry({ country: { name: countryName, region: this.region } })
          );
        }
      });
    }
  }



}
