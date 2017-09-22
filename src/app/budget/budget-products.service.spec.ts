import { TestBed, inject } from '@angular/core/testing';

import { BudgetProductsService } from './budget-products.service';

describe('BudgetProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetProductsService]
    });
  });

  it('should ...', inject([BudgetProductsService], (service: BudgetProductsService) => {
    expect(service).toBeTruthy();
  }));
});
