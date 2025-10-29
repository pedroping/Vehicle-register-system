import { isPlatformServer } from '@angular/common';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Inject,
  input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IVehicle } from '@shared/models';
import { fromEvent, startWith, throttleTime } from 'rxjs';

@Directive({})
export class ScrollAnimationDirective implements OnInit {
  vehicle = input.required<IVehicle>();

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor(
    private readonly destroyRef: DestroyRef,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformServer(this.platformId)) return;

    const y = 110 + (this.vehicle().index || 0) * 650;

    const height =
      this._elementRef.nativeElement.getBoundingClientRect().height;
    const midPosition = y + 25;
    const afterPosition = y + height + 100;

    fromEvent(window, 'scroll')
      .pipe(
        throttleTime(20),
        takeUntilDestroyed(this.destroyRef),
        startWith(null)
      )
      .subscribe(() => {
        const isAfter =
          window.document.documentElement.scrollTop >= midPosition;
        const isBehind =
          window.document.documentElement.scrollTop >= afterPosition;

        this._elementRef.nativeElement.style.scale = isAfter ? '95%' : '100%';
        this._elementRef.nativeElement.style.boxShadow = isBehind
          ? 'none'
          : '0px 0px 8px var(--light-black-01)';
      });
  }
}
