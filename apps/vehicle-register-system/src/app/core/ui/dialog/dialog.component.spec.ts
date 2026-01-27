/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DialogHandleService } from '../../services/utils/dialog-handle/dialog-handle.service';
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
});
