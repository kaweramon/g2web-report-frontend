import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductQuickSellComponent } from './product-quick-sell.component';

describe('ProductQuickSellComponent', () => {
  let component: ProductQuickSellComponent;
  let fixture: ComponentFixture<ProductQuickSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductQuickSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductQuickSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
