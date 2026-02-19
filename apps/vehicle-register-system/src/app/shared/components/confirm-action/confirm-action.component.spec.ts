/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ConfirmActionComponent } from './confirm-action.component';
import { By } from '@angular/platform-browser';
import { DialogHandleService } from '@services';

describe('ConfirmActionComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmActionComponent, RouterModule],
      providers: [provideAnimations(), DialogHandleService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should cancel click emit event', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const app = fixture.componentInstance;

    const cancleBtn = fixture.debugElement.query(By.css('[data-testeid=cancel-btn]'))
      ?.nativeElement as HTMLButtonElement;

    expect(cancleBtn).toBeTruthy();

    const emitSpy = jasmine.createSpy('event');
    app.event.subscribe(emitSpy);
    cancleBtn.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('should confirm click emit event', () => {
    const fixture = TestBed.createComponent(ConfirmActionComponent);
    const app = fixture.componentInstance;

    const cancleBtn = fixture.debugElement.query(By.css('[data-testeid=confirm-btn]'))
      ?.nativeElement as HTMLButtonElement;

    expect(cancleBtn).toBeTruthy();

    const emitSpy = jasmine.createSpy('event');
    app.event.subscribe(emitSpy);
    cancleBtn.click();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
