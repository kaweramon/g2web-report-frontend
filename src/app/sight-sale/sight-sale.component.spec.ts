import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightSaleComponent } from './sight-sale.component';

describe('SightSaleComponent', () => {
  let component: SightSaleComponent;
  let fixture: ComponentFixture<SightSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
