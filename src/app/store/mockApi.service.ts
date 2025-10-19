import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MockApiService {
  private randomFail<T>(value: T): Observable<T> {
    const shouldFail = Math.random() < 0.2;
    if (shouldFail) {
      return throwError(() => new Error('Random API failure')).pipe(delay(500));
    }
    return of(value).pipe(delay(500));
  }

  increment(current: number): Observable<number> {
    return this.randomFail(current + 1);
  }

  decrement(current: number): Observable<number> {
    return this.randomFail(current - 1);
  }

  reset(): Observable<number> {
    return this.randomFail(0);
  }
}
