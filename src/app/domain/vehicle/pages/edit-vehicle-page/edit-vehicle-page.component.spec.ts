/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr } from 'ngx-toastr';
import { EditVehiclePageComponent } from './edit-vehicle-page.component';

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
            snapshot: { params: { id: '1afe' } },
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
});
