/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehiclesApiService } from './vehicles-api.service';

describe('Service: Vehicles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehiclesApiService],
    });
  });

  it('should ...', inject(
    [VehiclesApiService],
    (service: VehiclesApiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
