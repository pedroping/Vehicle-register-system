/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmActionComponent } from './confirm-action.component';

describe('ConfirmActionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmActionComponent, RouterModule],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
