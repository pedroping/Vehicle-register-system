/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CategoriesApiService } from './categories-api.service';

describe('Service: Categories', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriesApiService],
    });
  });

  it('should ...', inject(
    [CategoriesApiService],
    (service: CategoriesApiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
