import { TestBed, inject } from '@angular/core/testing';

import { LiberationService } from './liberation.service';

describe('LiberationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiberationService]
    });
  });

  it('should ...', inject([LiberationService], (service: LiberationService) => {
    expect(service).toBeTruthy();
  }));
});
