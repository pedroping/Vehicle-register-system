/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthFacadeService } from './auth-facade.service';

describe('Service: AuthFacade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthFacadeService]
    });
  });

  it('should ...', inject([AuthFacadeService], (service: AuthFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
