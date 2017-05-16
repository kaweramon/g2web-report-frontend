import { TestBed, inject } from '@angular/core/testing';

import { ProductFamilyService } from './product-family.service';

describe('ProductFamilyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductFamilyService]
    });
  });

  it('should ...', inject([ProductFamilyService], (service: ProductFamilyService) => {
    expect(service).toBeTruthy();
  }));
});
