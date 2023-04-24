import {ActionReducerMap, createFeatureSelector, createReducer, createSelector} from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

export interface Country {
  name: string;
  region: string;
}

export interface RegionState extends EntityState<Country> {}

export const regionAdapter = createEntityAdapter<Country>({
  selectId: (country: Country) => country.name
});

export const regionInitialState: RegionState = regionAdapter.getInitialState({});

const regionReducer = createReducer(
  regionInitialState,
  // Define your reducer logic here
);

export interface CountryState extends EntityState<Country> {}

export const countryAdapter = createEntityAdapter<Country>({
  selectId: (country: Country) => country.name
});

export const countryInitialState: CountryState = countryAdapter.getInitialState({});

const countryReducer = createReducer(
  countryInitialState,
  // Define your reducer logic here
);

export interface AppState {
  regions: RegionState;
  countries: CountryState;
}

export const reducers: ActionReducerMap<AppState> = {
  regions: regionReducer,
  countries: countryReducer,
};

export const selectCountryState = createFeatureSelector<CountryState>('countries');

export const selectCountries = createSelector(
  selectCountryState,
  (state) => state.entities
    ? Object.keys(state.entities).map(key => state.entities[key])
    : []
);
