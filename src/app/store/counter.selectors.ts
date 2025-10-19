
import { createSelector } from '@ngrx/store';
import { AppState } from '.';
import { CounterState } from './counter.state';

export const selectCounter = (state: AppState) => state.counter;

export const selectCounterValue = createSelector(
  selectCounter,
  (counterState: CounterState) => counterState.value
);

export const selectCounterIsBusy = createSelector(
  selectCounter,
  (counterState: CounterState) => counterState.isBusy
);
