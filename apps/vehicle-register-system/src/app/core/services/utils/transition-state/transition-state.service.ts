import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransitionStateService {
  private readonly transitionEnd$$ = new Subject<void>();

  constructor() {}

  transtionEnd() {
    this.transitionEnd$$.next();
  }

  get transitionEnd$() {
    return this.transitionEnd$$.asObservable();
  }
}
