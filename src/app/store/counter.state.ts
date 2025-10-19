export interface CounterState {
  value: number;
  isBusy: boolean;
  error?: string | null;
}

export const initialCounterState: CounterState = {
  value: 0,
  isBusy: false,
  error: null
};
