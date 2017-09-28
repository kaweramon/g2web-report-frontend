import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeleteBudgetComponent } from './modal-delete-budget.component';

describe('ModalDeleteBudgetComponent', () => {
  let component: ModalDeleteBudgetComponent;
  let fixture: ComponentFixture<ModalDeleteBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDeleteBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDeleteBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
