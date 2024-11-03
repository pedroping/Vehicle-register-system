/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [provideAnimations(), DialogHandleService],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set call setState on click', () => {
    const fixture = TestBed.createComponent(DialogComponent);

    const dialogHandleService =
      fixture.debugElement.injector.get(DialogHandleService);

    const setStateSpy = spyOn(dialogHandleService, 'setState');

    fixture.debugElement.nativeElement.click();
    fixture.detectChanges();

    expect(setStateSpy).toHaveBeenCalled();
  });

  it('should set flex state on init', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const app = fixture.componentInstance;

    const dialogHandleService =
      fixture.debugElement.injector.get(DialogHandleService);

    dialogHandleService.setState(true);

    const stateSpy = jasmine.createSpy('image$');

    dialogHandleService.state$$.subscribe(stateSpy);

    app.ngOnInit();

    expect(stateSpy).toHaveBeenCalled();
  });
});
