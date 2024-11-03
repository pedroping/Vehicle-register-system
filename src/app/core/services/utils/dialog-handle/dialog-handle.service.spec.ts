/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DialogHandleService } from './dialog-handle.service';
import { ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';

let service: DialogHandleService<any>;

describe('Service: DialogHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogHandleService],
    });

    service = TestBed.inject(DialogHandleService);
  });

  it('should ...', inject(
    [DialogHandleService],
    (service: DialogHandleService<boolean>) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should set vcr', () => {
    const setVcrSpy = spyOn(service, 'setVcr');

    service.setVcr(<ViewContainerRef>{});

    expect(setVcrSpy).toHaveBeenCalled();
  });

  it('should return state boolean value', () => {
    service.setState(true);

    expect(service.state).toBeTruthy();
  });
  
  it('should return state observable', (done) => {
    service.setState(true);

    service.state$$.pipe(take(1)).subscribe((value) => {
      expect(value).toBeTruthy();
      done();
    });
  });
});
