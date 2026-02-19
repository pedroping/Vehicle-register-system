/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, take } from 'rxjs';
import { VehiclesApiService } from '../../api/vehicles-api/vehicles-api.service';
import { VehiclesFacade } from './vehicles-facade.service';
import { IVehicle } from '@models';
import { ENVIRONMENT_TOKEN } from '@tokens';

describe('Service: VehiclesFacade', () => {
  let service: VehiclesFacade;
  let httpTestingController: HttpTestingController;
  let environmentToken: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: VehiclesApiService,
          useValue: {
            getVehicles: () => of([<IVehicle>{}]),
            getVehicle: (id: number | string) => of(<IVehicle>{}),
            editVehicle: (id: number | string) => of(<IVehicle>{}),
            addVehicle: (vehicle: IVehicle) => of(<IVehicle>{}),
            deleteVehicle: (id: number | string) => of(<IVehicle>{}),
          },
        },
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(VehiclesFacade);
    environmentToken = TestBed.inject(ENVIRONMENT_TOKEN);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('all functions test', () => {
    it('should do return an array of vehicles', (done) => {
      service
        .getVehicles$$()
        .pipe(take(1))
        .subscribe((vehicles) => {
          expect(Array.isArray(vehicles)).toBeTrue();
          done();
        });
    });

    it('should get an veichle', (done) => {
      service
        .getVehicle(0)
        .pipe(take(1))
        .subscribe((vehicle) => {
          expect(vehicle).toBeTruthy();
          done();
        });
    });

    it('should add an veichle', (done) => {
      service
        .addVehicle(<IVehicle>{})
        .pipe(take(1))
        .subscribe((vehicle) => {
          expect(vehicle).toBeTruthy();
          done();
        });
    });

    it('should edit an veichle', (done) => {
      service
        .editVehicle(<IVehicle>{})
        .pipe(take(1))
        .subscribe((vehicle) => {
          expect(vehicle).toBeTruthy();
          done();
        });
    });

    it('should delete an veichle', (done) => {
      service
        .deleteVehicle(0)
        .pipe(take(1))
        .subscribe((vehicle) => {
          expect(vehicle).toBeTruthy();
          done();
        });
    });

    it('should return an array of vehicles', () => {
      expect(Array.isArray(service.vehicles)).toBeTrue();
    });
  });
});
