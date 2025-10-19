export interface CounterState {
  value: number;
  isBusy: boolean;
}

export const initialCounterState: CounterState = {
  value: 0,
  isBusy: false
};
