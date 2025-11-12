/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NewVehiclePageComponent } from './new-vehicle-page.component';
import { VehiclesFacade } from '@core/services/facades';
import { of } from 'rxjs';
import { IVehicle } from '@shared/models';

describe('NewVehiclePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewVehiclePageComponent, RouterModule],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr({ maxOpened: 1, autoDismiss: true }),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should reset form', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    const resetSpy = spyOn(app.vehicleForm, 'reset');

    app.ngOnInit();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('should mark form as touched on invalid', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    const markAsDirtySpy = spyOn(app.vehicleForm, 'markAsDirty');
    const markAllAsTouchedSpy = spyOn(app.vehicleForm, 'markAllAsTouched');
    const updateValueAndValiditySpy = spyOn(app.vehicleForm, 'updateValueAndValidity');

    app.save();

    expect(markAsDirtySpy).toHaveBeenCalled();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(updateValueAndValiditySpy).toHaveBeenCalled();
  });

  it('shoudl call post on valid from', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    app.vehicleForm.patchValue({
      licensePlate: '1234567',
      chassi: '12345678901234567',
      renavam: '12345678901',
      model: '13',
      carBrand: 0,
      year: '2024',
      category: 1,
    });

    const postVehicleSpy = spyOn(app, 'postVehicle');

    app.save();

    expect(postVehicleSpy).toHaveBeenCalled();
  });

  it('should cancel new vehicle', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    const router = fixture.debugElement.injector.get(Router);

    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const vehicleFormReset = spyOn(app.vehicleForm, 'reset');

    app.cancel();

    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(vehicleFormReset).toHaveBeenCalled();
  });

  it('should post vehicle', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);
    const router = fixture.debugElement.injector.get(Router);
    const toastrService = fixture.debugElement.injector.get(ToastrService);

    app.vehicleForm.patchValue({
      licensePlate: '1234567',
      chassi: '12345678901234567',
      renavam: '12345678901',
      model: '13',
      carBrand: 0,
      year: '2024',
      category: 1,
    });

    const addVehicleSpy = spyOn(vehiclesFacade, 'addVehicle').and.callFake(() => {
      return of(<IVehicle>{});
    });
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const vehicleFormReset = spyOn(app.vehicleForm, 'reset');
    const setVehiclesSpy = spyOn(vehiclesFacade, 'setVehicles');
    const successSpy = spyOn(toastrService, 'success');

    app.postVehicle();

    expect(addVehicleSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(vehicleFormReset).toHaveBeenCalled();
    expect(setVehiclesSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
  });

  it('should post vehicle and set null values', () => {
    const fixture = TestBed.createComponent(NewVehiclePageComponent);
    const app = fixture.componentInstance;

    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);
    const router = fixture.debugElement.injector.get(Router);
    const toastrService = fixture.debugElement.injector.get(ToastrService);

    app.vehicleForm.patchValue({
      licensePlate: '1234567',
      chassi: '12345678901234567',
      renavam: null,
      model: '13',
      carBrand: null,
      year: '2024',
      category: null,
    });

    const addVehicleSpy = spyOn(vehiclesFacade, 'addVehicle').and.callFake(() => {
      return of(<IVehicle>{});
    });
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const vehicleFormReset = spyOn(app.vehicleForm, 'reset');
    const setVehiclesSpy = spyOn(vehiclesFacade, 'setVehicles');
    const successSpy = spyOn(toastrService, 'success');

    app.postVehicle();

    expect(addVehicleSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(vehicleFormReset).toHaveBeenCalled();
    expect(setVehiclesSpy).toHaveBeenCalled();
    expect(successSpy).toHaveBeenCalled();
  });
});
