/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { LoadingHandleService } from '@core/services/utils';

describe('LoadingSpinnerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
      providers: [provideAnimations()],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set display to flex', (done) => {
    const fixture = TestBed.createComponent(LoadingSpinnerComponent);
    const app = fixture.componentInstance;

    const loadingHandleService =
      fixture.debugElement.injector.get(LoadingHandleService);

    app.ngOnInit();
    loadingHandleService.enableInterceptor();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(fixture.debugElement.nativeElement.style.display).toBe('flex');
      done();
    });
  });
});
