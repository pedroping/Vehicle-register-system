import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterModule],
      providers: [provideAnimations(), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('shoul create info-loading-spinner', () => {
    const fixture = TestBed.createComponent(AppComponent);

    const infoSpinner = fixture.debugElement.query(
      By.css('[data-testid=info-loading-spinner-template]')
    );

    expect(infoSpinner).toBeTruthy();
  });
});
