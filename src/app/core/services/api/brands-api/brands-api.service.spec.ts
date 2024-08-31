/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BrandsApiService } from './brands-api.service';

describe('Service: BrandsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandsApiService],
    });
  });

  it('should ...', inject([BrandsApiService], (service: BrandsApiService) => {
    expect(service).toBeTruthy();
  }));
});
