/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VehiclesApiService } from '@core/services/api';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { skip, take } from 'rxjs';
import { VehiclesFacade } from './vehicles-facade.service';

describe('Service: VehiclesFacade', () => {
  let service: VehiclesFacade;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        VehiclesApiService,
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(VehiclesFacade);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('setVehicles()', () => {
    it('should do return an array of vehicles', (done) => {
      service
        .getVehicles$$()
        .pipe(skip(1), take(1))
        .subscribe((vehicles) => {
          expect(Array.isArray(vehicles)).toBeTrue();
          done();
        });
    });
  });
});
