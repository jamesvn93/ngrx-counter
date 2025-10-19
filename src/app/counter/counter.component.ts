import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../store";
import {increment, decrement, reset} from "../store/counter.actions";
import {selectCounterValue, selectCounterIsBusy} from "../store/counter.selectors";
import {CommonModule} from "@angular/common";
import { Observable, Subject } from "rxjs";

@Component({
  selector: "app-counter",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./counter.component.html",
  styleUrls: ["./counter.component.scss"],
})
export class CounterComponent {
  public counter$: Observable<number> = new Subject<number>();
  public isBusy$: Observable<boolean> = new Subject<boolean>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.counter$ = this.store.select(selectCounterValue);
    this.isBusy$ = this.store.select(selectCounterIsBusy);
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }
}
