/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { ListVehiclePageComponent } from './list-vehicle-page.component';

describe('ListVehiclePageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVehiclePageComponent, RouterModule],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ListVehiclePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
