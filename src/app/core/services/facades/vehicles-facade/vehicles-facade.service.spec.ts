/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehiclesFacade } from './vehicles-facade.service';

describe('Service: VehiclesFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesFacade]
    });
  });

  it('should ...', inject([VehiclesFacade], (service: VehiclesFacade) => {
    expect(service).toBeTruthy();
  }));
});
