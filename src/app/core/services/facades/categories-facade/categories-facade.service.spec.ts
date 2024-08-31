/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CategoriesFacade } from './categories-facade.service';

describe('Service: CategoriesFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesFacade],
    });
  });

  it('should ...', inject([CategoriesFacade], (service: CategoriesFacade) => {
    expect(service).toBeTruthy();
  }));
});
