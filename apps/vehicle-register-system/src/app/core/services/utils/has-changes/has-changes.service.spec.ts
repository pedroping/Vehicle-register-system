import { TestBed, inject } from '@angular/core/testing';
import { HasChangesService } from './has-changes.service';

describe('Service: HasChanges', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasChangesService],
    });
  });

  it('should ...', inject([HasChangesService], (service: HasChangesService) => {
    expect(service).toBeTruthy();
  }));
});
