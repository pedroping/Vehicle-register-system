/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HomePageComponent, RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1afe' } },
          },
        },
      ],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HomePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
