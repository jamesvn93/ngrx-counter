import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  increment,
  incrementSuccess,
  incrementFailure,
  decrement,
  decrementSuccess,
  decrementFailure,
  reset,
  resetSuccess,
  resetFailure,
} from "./counter.actions";
import {switchMap, map, catchError, withLatestFrom} from "rxjs/operators";
import {of} from "rxjs";
import {MockApiService} from "./mockApi.service";
import {Store} from "@ngrx/store";
import {AppState} from "./index";
import {selectCounterValue} from "./counter.selectors";

@Injectable()
export class CounterEffects {
  increment$;
  decrement$;
  reset$;

  constructor(
    private actions$: Actions,
    private mockApi: MockApiService,
    private store: Store<AppState>
  ) {
    this.increment$ = createEffect(() =>
      this.actions$.pipe(
        ofType(increment),
        withLatestFrom(this.store.select(selectCounterValue)),
        switchMap(([_, counterValue]) =>
          this.mockApi.increment(counterValue).pipe(
            map((newValue) => incrementSuccess(newValue)),
            catchError((error) => of(incrementFailure(error.message)))
          )
        )
      )
    );

    this.decrement$ = createEffect(() =>
      this.actions$.pipe(
        ofType(decrement),
        withLatestFrom(this.store.select(selectCounterValue)),
        switchMap(([_, counterValue]) =>
          this.mockApi.decrement(counterValue).pipe(
            map((newValue) => decrementSuccess(newValue)),
            catchError((error) => of(decrementFailure(error.message)))
          )
        )
      )
    );

    this.reset$ = createEffect(() =>
      this.actions$.pipe(
        ofType(reset),
        switchMap(() =>
          this.mockApi.reset().pipe(
            map((newValue) => resetSuccess(newValue)),
            catchError((error) => of(resetFailure(error.message)))
          )
        )
      )
    );
  }
}
