import { TestBed, inject } from '@angular/core/testing';

import { QuickSellServiceService } from './quick-sell-service';

describe('QuickSellServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuickSellServiceService]
    });
  });

  it('should ...', inject([QuickSellServiceService], (service: QuickSellServiceService) => {
    expect(service).toBeTruthy();
  }));
});
