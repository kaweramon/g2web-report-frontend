import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickSellDetailsComponent } from './quick-sell-details.component';

describe('QuickSellDetailsComponent', () => {
  let component: QuickSellDetailsComponent;
  let fixture: ComponentFixture<QuickSellDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickSellDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickSellDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
