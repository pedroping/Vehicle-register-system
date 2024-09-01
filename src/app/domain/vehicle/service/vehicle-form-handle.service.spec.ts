/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { VehicleFormHandleService } from './vehicle-form-handle.service';

describe('Service: VehicleDataHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleFormHandleService],
    });
  });

  it('should ...', inject(
    [VehicleFormHandleService],
    (service: VehicleFormHandleService) => {
      expect(service).toBeTruthy();
    }
  ));
});
