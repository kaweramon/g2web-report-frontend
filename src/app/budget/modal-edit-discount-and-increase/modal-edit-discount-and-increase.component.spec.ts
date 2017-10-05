import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditDiscountAndIncreaseComponent } from './modal-edit-discount-and-increase.component';

describe('ModalEditDiscountAndIncreaseComponent', () => {
  let component: ModalEditDiscountAndIncreaseComponent;
  let fixture: ComponentFixture<ModalEditDiscountAndIncreaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditDiscountAndIncreaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditDiscountAndIncreaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
