import { DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl } from '@angular/forms';
import { FORM_ERRORS } from '@shared/models';
import { merge, startWith } from 'rxjs';

@Directive({
  selector: '[formError]',
  standalone: true,
})
export class FormErrorDirective {
  controlSelector = input.required<FormControl | string>({
    alias: 'formError',
  });

  control?: FormControl;

  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly controlContainer = inject(ControlContainer, {
    optional: true,
  });

  ngOnInit(): void {
    const controlSelector = this.controlSelector();

    if (!controlSelector) return;

    if (controlSelector instanceof FormControl) {
      this.control = controlSelector;
      return this.createSubscriptions();
    }

    if (!this.controlContainer) return;

    this.control = this.controlContainer.control?.get(controlSelector) as FormControl;

    this.createSubscriptions();
  }

  createSubscriptions() {
    if (!this.control) return;

    merge(this.control.statusChanges, this.control.valueChanges, this.control.events)
      .pipe(takeUntilDestroyed(this.destroyRef), startWith(null))
      .subscribe(() => {
        if (this.control?.valid || (!this.control?.dirty && !this.control?.touched)) {
          this.elementRef.nativeElement.innerHTML = '';
          return;
        }

        const errorKey = Object.keys(this.control?.errors ?? {})[0];

        if (errorKey)
          this.elementRef.nativeElement.innerHTML = FORM_ERRORS[errorKey]?.(
            this.control?.errors?.[errorKey],
          );
      });
  }
}
