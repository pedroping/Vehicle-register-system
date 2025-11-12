/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { INewVehicle } from '@shared/models';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { switchMap } from 'rxjs';
import { VehiclesApiService } from './vehicles-api.service';

describe('Service: Vehicles', () => {
  let service: VehiclesApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(VehiclesApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getVehicles()', () => {
    it('should do return an array of vehicles', (done) => {
      service.getVehicles().subscribe((veicles) => {
        expect(Array.isArray(veicles)).toBeTrue();
        done();
      });
    });
  });

  describe('addVehicle(), getVehicle(), editVehicle(), deleteVehicle()', () => {
    const newVehicle: INewVehicle = {
      image: 'https://cdn.motor1.com/images/mgl/kNREB/s3/lamborghini-huracan-sto.jpg',
      model: 'Huracán Sport',
      year: '2024',
      chassi: '123321313asffasf2',
      renavam: '12323213333',
      licensePlate: '1asffxv',
      carBrand: 18,
      category: 0,
    };

    it('should create, get, edit and delete', (done) => {
      service
        .addVehicle(newVehicle)
        .pipe(
          switchMap((newVehiclePosted) => {
            return service.getVehicle(newVehiclePosted.id).pipe(
              switchMap((vehicleGet) => {
                return service
                  .editVehicle({
                    ...vehicleGet,
                    model: 'Teste Novo',
                  })
                  .pipe(
                    switchMap((finalVehicle) => {
                      return service.deleteVehicle(finalVehicle.id);
                    }),
                  );
              }),
            );
          }),
        )
        .subscribe((response) => {
          expect(response).toBeTruthy();
          done();
        });
    });
  });
});
