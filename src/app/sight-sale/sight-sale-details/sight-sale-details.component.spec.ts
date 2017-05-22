import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SightSaleDetailsComponent } from './sight-sale-details.component';

describe('SightSaleDetailsComponent', () => {
  let component: SightSaleDetailsComponent;
  let fixture: ComponentFixture<SightSaleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SightSaleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SightSaleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
