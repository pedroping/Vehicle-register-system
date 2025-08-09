/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { EditVehiclePageComponent } from './edit-vehicle-page.component';
import { VehiclesFacade } from '@core/services/facades';
import { IDialogComponent, IVehicle } from '@shared/models';
import { of, Subject } from 'rxjs';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { OutputEmitterRef } from '@angular/core';

describe('EditVehiclePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVehiclePageComponent, RouterModule],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideToastr({ maxOpened: 1, autoDismiss: true }),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({ id: '1afe' }) },
            params: of({ id: '1afe' }),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return vehicle model', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    app.vehicleForm.controls.model.setValue('Teste');

    expect(app.modelControl.value).toBe('Teste');
  });

  it('should get vehicle from route params', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);

    const getVehicleSpy = spyOn(vehiclesFacade, 'getVehicle').and.callFake(
      () => {
        return of(<IVehicle>{});
      }
    );

    app.ngOnInit();

    expect(getVehicleSpy).toHaveBeenCalled();
    expect(app.initialFormValue).toBeTruthy();
  });

  it('should cancel new vehicle', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    const router = fixture.debugElement.injector.get(Router);

    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const vehicleFormReset = spyOn(app.vehicleForm, 'reset');

    app.cancel();

    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(vehicleFormReset).toHaveBeenCalled();
  });

  it('should mark form as touched on invalid', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    const markAsDirtySpy = spyOn(app.vehicleForm, 'markAsDirty');
    const markAllAsTouchedSpy = spyOn(app.vehicleForm, 'markAllAsTouched');
    const updateValueAndValiditySpy = spyOn(
      app.vehicleForm,
      'updateValueAndValidity'
    );

    app.save();

    expect(markAsDirtySpy).toHaveBeenCalled();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(updateValueAndValiditySpy).toHaveBeenCalled();
  });

  it('should show message on no changes', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

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

    const hasChangedAnyValueSpy = spyOn(app, 'hasChangedAnyValue').and.callFake(
      () => false
    );

    const warningSpy = spyOn(toastrService, 'warning');

    app.save();

    expect(warningSpy).toHaveBeenCalled();
    expect(hasChangedAnyValueSpy).toHaveBeenCalled();
  });

  it('should show call edit', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
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

    const hasChangedAnyValueSpy = spyOn(app, 'hasChangedAnyValue').and.callFake(
      () => true
    );
    const editVehicleSpy = spyOn(app, 'editVehicle');

    app.save();

    expect(editVehicleSpy).toHaveBeenCalled();
    expect(hasChangedAnyValueSpy).toHaveBeenCalled();
  });

  it('should hasChangedAnyValue return false on undefined initialValue', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    app.initialFormValue = null as unknown as IVehicle;

    const changed = app.hasChangedAnyValue();

    expect(changed).toBeFalse();
  });

  it('should hasChangedAnyValue return true', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    app.initialFormValue = <IVehicle>{
      licensePlate: '12347',
      chassi: '12345601234567',
      renavam: '125678901',
      model: '1',
      carBrand: 0,
      year: '224',
      category: 1,
    };

    app.vehicleForm.patchValue({
      licensePlate: '1234567',
      chassi: '12345678901234567',
      renavam: '12345678901',
      model: '13',
      carBrand: 0,
      year: '2024',
      category: 1,
    });

    const changed = app.hasChangedAnyValue();

    expect(changed).toBeTrue();
  });

  it('shoudl edit vehicle', () => {
    const fixture = TestBed.createComponent(EditVehiclePageComponent);
    const app = fixture.componentInstance;

    const router = fixture.debugElement.injector.get(Router);
    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);
    const toastrService = fixture.debugElement.injector.get(ToastrService);

    const setVehiclesSpy = spyOn(vehiclesFacade, 'setVehicles');
    const toastSucessSpy = spyOn(toastrService, 'success');
    const navigateByUrlSpy = spyOn(router, 'navigateByUrl');
    const resetSpy = spyOn(app.vehicleForm, 'reset');
    const editVehicle = spyOn(vehiclesFacade, 'editVehicle').and.callFake(() =>
      of(<IVehicle>{})
    );

    app.vehicleForm.patchValue({
      licensePlate: '1234567',
      chassi: '12345678901234567',
      renavam: '12345678901',
      model: '13',
      carBrand: 0,
      year: '2024',
      category: 1,
      id: 1312,
    });

    app.editVehicle();

    expect(setVehiclesSpy).toHaveBeenCalled();
    expect(toastSucessSpy).toHaveBeenCalled();
    expect(navigateByUrlSpy).toHaveBeenCalled();
    expect(resetSpy).toHaveBeenCalled();
    expect(editVehicle).toHaveBeenCalled();
  });
});
