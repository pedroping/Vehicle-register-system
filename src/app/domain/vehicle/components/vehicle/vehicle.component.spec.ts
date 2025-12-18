import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { eRoutes } from '@enums';
import { IVehicle } from '@models';
import { BrandsFacade } from '@services';
import { ENVIRONMENT_TOKEN } from '@tokens';
import { provideToastr } from 'ngx-toastr';
import { VehicleComponent } from './vehicle.component';

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

    const deleteBtn = fixture.debugElement.query(By.css('[data-testid=delete-btn]'))
      ?.nativeElement as HTMLButtonElement;

    const deleteSpy = spyOn(app, 'deleteVehicle');

    deleteBtn.click();
    fixture.detectChanges();

    expect(deleteSpy).toHaveBeenCalled();
  });
});
