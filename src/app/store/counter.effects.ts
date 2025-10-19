
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CounterActions from './counter.actions';
import { MockApiService } from './mockApi.service';
import { Store } from '@ngrx/store';
import { CounterState } from './counter.state';
import { selectCounter } from './counter.selectors';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class CounterEffects {
  constructor(
    private actions$: Actions,
    private mockApi: MockApiService,
    private store: Store<{ counter: CounterState }>
  ) {}

  increment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.increment),
  withLatestFrom(this.store.select(selectCounter)),
      switchMap(([_, counterState]) =>
        this.mockApi.increment(counterState.value).pipe(
          map((newValue) => CounterActions.incrementSuccess(newValue)),
          catchError((error) => of(CounterActions.incrementFailure(error.message)))
        )
      )
    )
  );

  decrement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.decrement),
  withLatestFrom(this.store.select(selectCounter)),
      switchMap(([_, counterState]) =>
        this.mockApi.decrement(counterState.value).pipe(
          map((newValue) => CounterActions.decrementSuccess(newValue)),
          catchError((error) => of(CounterActions.decrementFailure(error.message)))
        )
      )
    )
  );

  reset$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CounterActions.reset),
      switchMap(() =>
        this.mockApi.reset().pipe(
          map((newValue) => CounterActions.resetSuccess(newValue)),
          catchError((error) => of(CounterActions.resetFailure(error.message)))
        )
      )
    )
  );
}
