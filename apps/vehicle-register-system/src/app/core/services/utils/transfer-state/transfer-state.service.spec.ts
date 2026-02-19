import { TestBed, inject } from '@angular/core/testing';
import { TransferStateService } from './transfer-state.service';

describe('Service: TransferState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferStateService],
    });
  });

  it('should ...', inject([TransferStateService], (service: TransferStateService) => {
    expect(service).toBeTruthy();
  }));
});
