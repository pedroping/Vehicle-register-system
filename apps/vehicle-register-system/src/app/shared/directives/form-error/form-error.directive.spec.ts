/* tslint:disable:no-unused-variable */

import {
  Component,
  DebugElement,
  ElementRef,
  OnInit,
  signal,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ControlContainer, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormErrorDirective } from './form-error.directive';

@Component({
  selector: 'app-test',
  imports: [FormErrorDirective, ReactiveFormsModule],
  template: ` <div [formError]="testeControl"></div> `,
})
class TestComponent implements OnInit {
  testeControl = new FormControl<string>('', {
    validators: [Validators.required],
    nonNullable: true,
  });

  ngOnInit(): void {
    this.testeControl.markAsDirty();
    this.testeControl.markAsTouched();
  }
}

describe('Directive: FormError', () => {
  let fixture: ComponentFixture<TestComponent>;
  let errorElement: DebugElement;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, FormErrorDirective],
      providers: [
        ViewContainerRef,
        FormErrorDirective,
        {
          provide: ElementRef,
          useValue: {
            nativeElement: document.createElement('div'),
          },
        },
        {
          provide: ControlContainer,
          useValue: {
            control: {
              get: () => new FormControl(),
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(TestComponent);
    elementRef = TestBed.inject(ElementRef);
    fixture.detectChanges();
    errorElement = fixture.debugElement.query(By.directive(FormErrorDirective));
  });

  it('Has directive', () => {
    expect(errorElement.nativeElement).toBeTruthy();
  });

  it('Error to be required', () => {
    expect(errorElement.nativeElement.innerHTML).toBe('Esse campo é obrigatório!');
  });

  it('Error to be minlength', (done) => {
    const control = fixture.componentInstance.testeControl;
    control.removeValidators([Validators.required]);
    control.addValidators([Validators.minLength(5)]);
    control.setValue('1');
    control.updateValueAndValidity();

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(errorElement.nativeElement.innerHTML).toBe(
        'Minimo de 5 caracteres permitidos. Quantidade atual 1',
      );
      done();
    });
  });

  it('Error to be maxlength', (done) => {
    const control = fixture.componentInstance.testeControl;
    control.removeValidators([Validators.required]);
    control.addValidators([Validators.maxLength(5)]);
    control.setValue('123456');
    control.updateValueAndValidity();

    fixture.componentInstance.ngOnInit();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(errorElement.nativeElement.innerHTML).toBe(
        'Máximo de 5 caracteres permitidos. Quantidade atual 6',
      );
      done();
    });
  });

  it('should call createSubscriptions', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal(new FormControl());

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    const createSubscriptionsSpy = spyOn(directive, 'createSubscriptions');

    directive.ngOnInit();

    expect(createSubscriptionsSpy).toHaveBeenCalled();
  });

  it('should set requied error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal(new FormControl('', [Validators.required]));

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe('Esse campo é obrigatório!');
  }));

  it('should set maxLenght error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal(new FormControl('', [Validators.maxLength(5)]));

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    (directive.controlSelector() as FormControl).setValue('123456');
    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      'Máximo de 5 caracteres permitidos. Quantidade atual 6',
    );
  }));

  it('should set minLenght error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal(new FormControl('', [Validators.minLength(5)]));

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    (directive.controlSelector() as FormControl).setValue('123');
    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      'Minimo de 5 caracteres permitidos. Quantidade atual 3',
    );
  }));

  it('should not call createSubscriptions', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal(undefined);

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    const createSubscriptionsSpy = spyOn(directive, 'createSubscriptions');
    directive.ngOnInit();

    expect(createSubscriptionsSpy).not.toHaveBeenCalled();
  });

  it('should get control not found controlcontainer', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal('Teste');

    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;
    (directive as unknown as { controlContainer: ControlContainer })['controlContainer'] =
      undefined as unknown as ControlContainer;

    const createSubscriptionsSpy = spyOn(directive, 'createSubscriptions');
    directive.ngOnInit();

    expect(createSubscriptionsSpy).not.toHaveBeenCalled();
  });

  it('should get control by controlContainer', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const controlSignal = signal('Teste');
    directive.controlSelector = controlSignal as unknown as typeof directive.controlSelector;

    const createSubscriptionsSpy = spyOn(directive, 'createSubscriptions');
    directive.ngOnInit();

    expect(createSubscriptionsSpy).toHaveBeenCalled();
  });

  it('should not start subscriptions on undefined control', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    const fnReturn = directive.createSubscriptions();

    expect(fnReturn).toBeFalsy();
  });
});
