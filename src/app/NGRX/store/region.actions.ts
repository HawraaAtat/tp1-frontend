import { createAction, props } from '@ngrx/store';
import { Country } from './';

export const addCountry = createAction(
  '[Region] Add Country',
  props<{ country: Country }>()
);

export const removeCountry = createAction(
  '[Region] Remove Country',
  props<{ name: string }>()
);
