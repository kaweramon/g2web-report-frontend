import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchBudgetComponent } from './modal-search-budget.component';

describe('ModalSearchBudgetComponent', () => {
  let component: ModalSearchBudgetComponent;
  let fixture: ComponentFixture<ModalSearchBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
