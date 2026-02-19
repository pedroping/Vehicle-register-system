/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ImageFieldComponent } from './image-field.component';
import { of, skip } from 'rxjs';

describe('ImageFieldComponent', () => {
  let app: ImageFieldComponent;

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

  afterEach(() => {});

  it('shoudl call onChange and onTouch', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    app.ngOnInit();

    app.onChange = (value: string | ArrayBuffer) => ({});
    app.onTouch = (value: string | ArrayBuffer) => ({});

    const imageSpy = jasmine.createSpy('image$');

    app.image$.next('');

    app.image$.subscribe(imageSpy);

    expect(imageSpy).toHaveBeenCalled();
  });

  it('should remove image', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    const imageSpy = jasmine.createSpy('image$');
    app.image$.subscribe(imageSpy);

    app.removeImage();

    expect(imageSpy).toHaveBeenCalled();
  });

  it('should change image', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    const imageSpy = jasmine.createSpy('image$');
    app.image$.subscribe(imageSpy);

    app.writeValue('image');

    expect(imageSpy).toHaveBeenCalled();
  });

  it('should upload image', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    const uploadFileSpy = spyOn(app, '_uploadFile').and.callFake(() => of(new File([], '')));

    const fileToBase64Spy = spyOn(app, '_fileToBase64').and.callFake(() => of(''));

    const imageSpy = jasmine.createSpy('image$');
    app.image$.subscribe(imageSpy);

    app.upLoadImg();

    expect(imageSpy).toHaveBeenCalled();
    expect(uploadFileSpy).toHaveBeenCalled();
    expect(fileToBase64Spy).toHaveBeenCalled();
  });

  it('should drop file', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    const imageSpy = jasmine.createSpy('image$');
    app.image$.subscribe(imageSpy);

    const fileToBase64Spy = spyOn(app, '_fileToBase64').and.callFake(() => of(''));

    app.onFileDrop([new File([], '')]);

    expect(imageSpy).toHaveBeenCalled();
    expect(fileToBase64Spy).toHaveBeenCalled();
  });

  it('should not drop file', () => {
    const fixture = TestBed.createComponent(ImageFieldComponent);
    const app = fixture.componentInstance;

    const imageSpy = jasmine.createSpy('image$');
    app.image$.pipe(skip(1)).subscribe(imageSpy);

    const fileToBase64Spy = spyOn(app, '_fileToBase64').and.callFake(() => of(''));

    app.onFileDrop([]);

    expect(imageSpy).not.toHaveBeenCalled();
    expect(fileToBase64Spy).not.toHaveBeenCalled();
  });
});
