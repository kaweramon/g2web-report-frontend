import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalClientLiberationComponent } from './modal-client-liberation.component';

describe('ModalClientLiberationComponent', () => {
  let component: ModalClientLiberationComponent;
  let fixture: ComponentFixture<ModalClientLiberationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalClientLiberationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalClientLiberationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
