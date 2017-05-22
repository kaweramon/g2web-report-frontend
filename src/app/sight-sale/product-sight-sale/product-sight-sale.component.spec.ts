import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSightSaleComponent } from './product-sight-sale.component';

describe('ProductSightSaleComponent', () => {
  let component: ProductSightSaleComponent;
  let fixture: ComponentFixture<ProductSightSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSightSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSightSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
