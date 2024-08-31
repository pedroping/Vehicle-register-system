import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, FormControl } from '@angular/forms';
import { FORM_ERRORS } from '@shared/models';
import { merge, startWith } from 'rxjs';

@Directive({
  selector: '[formError]',
  standalone: true,
})
export class FormErrorDirective {
  @Input({ required: true, alias: 'formError' }) controlSelector?:
    | FormControl
    | string;

  control?: FormControl;

  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly controlContainer = inject(ControlContainer, {
    optional: true,
  });

  ngOnInit(): void {
    if (!this.controlSelector) return;

    this.vcr.clear();

    if (this.controlSelector instanceof FormControl) {
      this.control = this.controlSelector;
      return this.createSubscriptions();
    }

    if (!this.controlContainer) return;

    this.control = this.controlContainer.control?.get(
      this.controlSelector
    ) as FormControl;

    return this.createSubscriptions();
  }

  createSubscriptions() {
    if (!this.control) return;
    merge(this.control.statusChanges, this.control.valueChanges)
      .pipe(takeUntilDestroyed(this.destroyRef), startWith(null))
      .subscribe(() => {
        if (this.control?.valid || !this.control?.dirty) {
          this.elementRef.nativeElement.innerHTML = '';
          return;
        }

        const errorKey = Object.keys(this.control?.errors ?? {})[0];

        if (errorKey)
          this.elementRef.nativeElement.innerHTML = FORM_ERRORS[errorKey]?.(
            this.control?.errors?.[errorKey]
          );
      });
  }
}
