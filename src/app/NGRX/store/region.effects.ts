import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { addCountry } from './region.actions';

@Injectable()
export class RegionEffects {
  addCountry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCountry),
      map(({ country }) => {
        return { type: 'Add Country Success', payload: { country } };
      })
    )
  );

  constructor(private actions$: Actions) {}
}
