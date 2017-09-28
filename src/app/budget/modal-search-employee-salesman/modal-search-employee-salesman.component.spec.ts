import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSearchEmployeeSalesmanComponent } from './modal-search-employee-salesman.component';

describe('ModalSearchEmployeeSalesmanComponent', () => {
  let component: ModalSearchEmployeeSalesmanComponent;
  let fixture: ComponentFixture<ModalSearchEmployeeSalesmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSearchEmployeeSalesmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSearchEmployeeSalesmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
