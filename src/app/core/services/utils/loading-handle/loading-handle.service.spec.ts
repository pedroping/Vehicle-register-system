/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LoadingHandleService } from './loading-handle.service';

describe('Service: LoadingHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingHandleService],
    });
  });

  it('should ...', inject(
    [LoadingHandleService],
    (service: LoadingHandleService) => {
      expect(service).toBeTruthy();
    },
  ));
});
