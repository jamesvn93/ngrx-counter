import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const incrementSuccess = createAction('[Counter] Increment Success', (newValue: number) => ({ newValue }));
export const incrementFailure = createAction('[Counter] Increment Failure', (error: string) => ({ error }));

export const decrement = createAction('[Counter] Decrement');
export const decrementSuccess = createAction('[Counter] Decrement Success', (newValue: number) => ({ newValue }));
export const decrementFailure = createAction('[Counter] Decrement Failure', (error: string) => ({ error }));

export const reset = createAction('[Counter] Reset');
export const resetSuccess = createAction('[Counter] Reset Success', (newValue: number) => ({ newValue }));
export const resetFailure = createAction('[Counter] Reset Failure', (error: string) => ({ error }));
