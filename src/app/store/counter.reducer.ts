
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { CounterState, initialCounterState } from './counter.state';

export const counterReducer = createReducer(
  initialCounterState,
  // Set isBusy true on base actions
  on(CounterActions.increment, CounterActions.decrement, CounterActions.reset, (state) => ({
    ...state,
    isBusy: true,
    error: null
  })),
  // Success actions: update value, reset isBusy, clear error
  on(CounterActions.incrementSuccess, CounterActions.decrementSuccess, CounterActions.resetSuccess, (state, { newValue }) => ({
    ...state,
    value: newValue,
    isBusy: false,
    error: null
  })),
  // Failure actions: reset isBusy, set error
  on(CounterActions.incrementFailure, CounterActions.decrementFailure, CounterActions.resetFailure, (state, { error }) => ({
    ...state,
    isBusy: false,
    error
  }))
);
