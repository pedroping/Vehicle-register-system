/* tslint:disable:no-unused-variable */

import {
  Component,
  DebugElement,
  ElementRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FormErrorDirective } from './form-error.directive';

@Component({
  selector: 'app-test',
  standalone: true,
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
    expect(errorElement.nativeElement.innerHTML).toBe(
      'Esse campo é obrigatório!'
    );
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
        'Minimo de 5 caracteres permitidos. Quantidade atual 1'
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
        'Máximo de 5 caracteres permitidos. Quantidade atual 6'
      );
      done();
    });
  });

  it('should call createSubscriptions', () => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    directive.controlSelector = new FormControl();

    const createSubscriptionsSpy = spyOn(directive, 'createSubscriptions');

    directive.ngOnInit();

    expect(createSubscriptionsSpy).toHaveBeenCalled();
  });

  it('should set requied error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    directive.controlSelector = new FormControl('', [Validators.required]);

    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      'Esse campo é obrigatório!'
    );
  }));

  it('should set maxLenght error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    directive.controlSelector = new FormControl('', [Validators.maxLength(5)]);
    directive.controlSelector.setValue('123456');
    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      'Máximo de 5 caracteres permitidos. Quantidade atual 6'
    );
  }));

  it('should set minLenght error value at mocked element', fakeAsync(() => {
    const directive = fixture.debugElement.injector.get(FormErrorDirective);

    directive.controlSelector = new FormControl('', [Validators.minLength(5)]);
    directive.controlSelector.setValue('123');
    directive.ngOnInit();

    directive.control?.markAsDirty();
    directive.control?.markAsUntouched();
    directive.control?.updateValueAndValidity();

    tick();

    expect(elementRef.nativeElement.innerHTML).toBe(
      'Minimo de 5 caracteres permitidos. Quantidade atual 3'
    );
  }));
});
