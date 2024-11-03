/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LoadingHandleService } from './loading-handle.service';

let service: LoadingHandleService;

describe('Service: LoadingHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingHandleService],
    });
    service = TestBed.inject(LoadingHandleService);
  });

  it('should ...', inject(
    [LoadingHandleService],
    (service: LoadingHandleService) => {
      expect(service).toBeTruthy();
    }
  ));

  describe('test all functions', () => {
    it('should return an observale and emit an true event', (done) => {
      const showInterceptor$ = service.showInterceptor$$;

      showInterceptor$.subscribe((value) => {
        expect(value).toBeTruthy();
        done();
      });

      service.enableInterceptor();
    });

    it('should return an observale and emit an false event', (done) => {
      const showInterceptor$ = service.showInterceptor$$;

      showInterceptor$.subscribe((value) => {
        expect(value).not.toBeTruthy();
        done();
      });

      service.disableInterceptor();
    });
  });
});
