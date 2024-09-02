/* tslint:disable:no-unused-variable */

import {
  Component,
  DebugElement,
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
      'Esse campo é obrigatório!',
    );
  });
});
