/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { FORM_ERRORS } from './form-error-models';

const formErros = FORM_ERRORS;

describe('Form messages', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return requied message', () => {
    expect(formErros['required']()).toEqual('Esse campo é obrigatório!');
  });

  it('should return maxlength message', () => {
    expect(
      formErros['maxlength']({ requiredLength: 5, actualLength: 10 })
    ).toEqual('Máximo de 5 caracteres permitidos. Quantidade atual 10');
  });

  it('should return minlength message', () => {
    expect(
      formErros['minlength']({ requiredLength: 10, actualLength: 5 })
    ).toEqual('Minimo de 10 caracteres permitidos. Quantidade atual 5');
  });
});
