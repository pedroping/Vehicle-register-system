/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr } from 'ngx-toastr';
import { NewVehiclePageComponent } from './new-vehicle-page.component';

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
});
