/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ImageFieldComponent } from './image-field.component';

describe('ImageFieldComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageFieldComponent],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
