/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy.service';

describe('Service: CustomRouteReuseStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomRouteReuseStrategy],
    });
  });

  it('should ...', inject([CustomRouteReuseStrategy], (service: CustomRouteReuseStrategy) => {
    expect(service).toBeTruthy();
  }));
});
