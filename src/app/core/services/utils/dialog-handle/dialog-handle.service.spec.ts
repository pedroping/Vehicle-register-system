/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DialogHandleService } from './dialog-handle.service';
import { ComponentRef, Type, ViewContainerRef } from '@angular/core';
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
});
