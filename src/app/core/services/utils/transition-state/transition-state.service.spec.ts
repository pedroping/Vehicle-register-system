/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransitionStateService } from './transition-state.service';

describe('Service: TransitionState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransitionStateService]
    });
  });

  it('should ...', inject([TransitionStateService], (service: TransitionStateService) => {
    expect(service).toBeTruthy();
  }));
});
