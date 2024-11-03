/* tslint:disable:no-unused-variable */

import {
  Component,
  DebugElement,
  ElementRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormErrorDirective } from './form-error.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestComponent, FormErrorDirective],
      providers: [ViewContainerRef, FormErrorDirective],
    });

    fixture = TestBed.createComponent(TestComponent);
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

  it('Error to be minlength', () => {
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
    });
  });

  it('Error to be maxlength', () => {
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
    });
  });
});
