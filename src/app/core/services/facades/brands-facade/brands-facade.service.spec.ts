/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BrandsFacade } from './brands-facade.service';

describe('Service: BrandsFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandsFacade],
    });
  });

  it('should ...', inject([BrandsFacade], (service: BrandsFacade) => {
    expect(service).toBeTruthy();
  }));
});
