/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { BrandsFacade, VehiclesFacade } from '@core/services/facades';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { VehicleComponent } from './vehicle.component';
import { IDialogComponent, IVehicle } from '@shared/models';
import { eRoutes } from '@shared/enums';
import { By } from '@angular/platform-browser';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { of, Subject } from 'rxjs';
import { OutputEmitterRef } from '@angular/core';

describe('VehicleComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleComponent],
      providers: [
        provideAnimations(),
        BrandsFacade,
        provideHttpClientTesting(),
        provideHttpClient(),
        provideToastr({ maxOpened: 1, autoDismiss: true }),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1afe' } },
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VehicleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shloud editRoute inclued correct data', () => {
    const fixture = TestBed.createComponent(VehicleComponent);
    const app = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', <IVehicle>{
      id: 2,
    });
    fixture.detectChanges();

    expect(app.editRoute()).toBe(`${eRoutes.VEHICLE_EDIT}/2`);
  });

  it('should call deleteVehicle', () => {
    const fixture = TestBed.createComponent(VehicleComponent);
    const app = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', <IVehicle>{
      id: 2,
    });

    const deleteBtn = fixture.debugElement.query(
      By.css('[data-testid=delete-btn]')
    )?.nativeElement as HTMLButtonElement;

    const deleteSpy = spyOn(app, 'deleteVehicle');

    deleteBtn.click();
    fixture.detectChanges();

    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should not call api on false event', () => {
    const fixture = TestBed.createComponent(VehicleComponent);
    const app = fixture.componentInstance;

    const dialogHandleService =
      fixture.debugElement.injector.get(DialogHandleService);

    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);

    const eventSubject$ = new Subject<boolean>();

    spyOn(dialogHandleService, 'openModal').and.callFake(() => {
      return <IDialogComponent<any>>{
        event: eventSubject$ as unknown as OutputEmitterRef<any>,
      };
    });

    const deleteVehicleSpy = spyOn(vehiclesFacade, 'deleteVehicle');

    app.deleteVehicle();
    eventSubject$.next(false);

    expect(deleteVehicleSpy).not.toHaveBeenCalled();
  });

  it('should not call api on true event', () => {
    const fixture = TestBed.createComponent(VehicleComponent);
    const app = fixture.componentInstance;

    fixture.componentRef.setInput('vehicle', <IVehicle>{
      id: 2,
    });

    const dialogHandleService =
      fixture.debugElement.injector.get(DialogHandleService);
    const vehiclesFacade = fixture.debugElement.injector.get(VehiclesFacade);
    const toastrService = fixture.debugElement.injector.get(ToastrService);

    const eventSubject$ = new Subject<boolean>();

    spyOn(dialogHandleService, 'openModal').and.callFake(() => {
      return <IDialogComponent<any>>{
        event: eventSubject$ as unknown as OutputEmitterRef<any>,
      };
    });

    const setVehiclesSpy = spyOn(vehiclesFacade, 'setVehicles');
    const toastSucessSpy = spyOn(toastrService, 'success');

    const deleteVehicleSpy = spyOn(
      vehiclesFacade,
      'deleteVehicle'
    ).and.callFake(() => {
      return of(<IVehicle>{});
    });

    app.deleteVehicle();
    eventSubject$.next(true);

    expect(setVehiclesSpy).toHaveBeenCalled();
    expect(toastSucessSpy).toHaveBeenCalled();
    expect(deleteVehicleSpy).toHaveBeenCalled();
  });
});
