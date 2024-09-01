/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { BrandsFacade } from '@core/services/facades';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
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
});
