/* tslint:disable:no-unused-variable */
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { VehicleFormComponent } from './vehicle-form.component';
import { VehiclesFacade } from '@core/services/facades';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

describe('VehicleFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleFormComponent],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        VehiclesFacade,
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
        FormGroupDirective,
        ControlContainer,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VehicleFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
