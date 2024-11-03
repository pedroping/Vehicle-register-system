import { TestBed } from '@angular/core/testing';
import { uploadFile } from './upload-file-fn';

describe('Upload File', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return an observable', () => {
    const fnResult$ = uploadFile();

    expect(fnResult$).toBeTruthy();
  });

  it('should emit change event', () => {
    const newInput = document.createElement('input');

    const createSpy = spyOn(document, 'createElement').and.callFake(
      () => newInput
    );
    const fnResult$ = uploadFile();

    newInput.dispatchEvent(new Event('change'));

    expect(createSpy).toHaveBeenCalled();
    expect(fnResult$).toBeTruthy();
  });
});
