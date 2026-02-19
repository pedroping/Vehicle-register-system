import { TestBed } from '@angular/core/testing';
import { fileToBase64 } from './file-to-base64-fn';

describe('File to Base 64', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return an observable', () => {
    const fnResult$ = fileToBase64(new File([], ''));

    expect(fnResult$).toBeTruthy();
  });
});
