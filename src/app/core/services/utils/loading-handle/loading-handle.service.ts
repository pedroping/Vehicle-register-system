import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class LoadingHandleService {
  private interceptorState$ = new Subject<boolean>();

  get showInterceptor$$() {
    return this.interceptorState$.asObservable();
  }

  enableInterceptor() {
    this.interceptorState$.next(true);
  }

  disableInterceptor() {
    this.interceptorState$.next(false);
  }
}
