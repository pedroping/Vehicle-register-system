/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehicleDataHandleService } from './vehicle-data-handle.service';

describe('Service: VehicleDataHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleDataHandleService],
    });
  });

  it('should ...', inject(
    [VehicleDataHandleService],
    (service: VehicleDataHandleService) => {
      expect(service).toBeTruthy();
    }
  ));
});
