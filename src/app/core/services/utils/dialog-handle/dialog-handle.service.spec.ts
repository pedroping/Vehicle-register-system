/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogHandleService } from './dialog-handle.service';

describe('Service: DialogHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogHandleService]
    });
  });

  it('should ...', inject([DialogHandleService], (service: DialogHandleService) => {
    expect(service).toBeTruthy();
  }));
});
