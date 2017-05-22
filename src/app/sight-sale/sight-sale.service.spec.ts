import { TestBed, inject } from '@angular/core/testing';

import { SightSaleService } from './sight-sale.service';

describe('SightSaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SightSaleService]
    });
  });

  it('should ...', inject([SightSaleService], (service: SightSaleService) => {
    expect(service).toBeTruthy();
  }));
});
