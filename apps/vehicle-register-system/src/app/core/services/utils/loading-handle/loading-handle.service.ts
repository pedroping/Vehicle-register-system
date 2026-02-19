import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'any',
})
export class LoadingHandleService {
  private interceptorState$ = new Subject<boolean>();
  private readonly platformId = inject(PLATFORM_ID);

  get showInterceptor$$() {
    return this.interceptorState$.asObservable();
  }

  enableInterceptor() {
    this.interceptorState$.next(isPlatformBrowser(this.platformId));
  }

  disableInterceptor() {
    this.interceptorState$.next(false);
  }
}
