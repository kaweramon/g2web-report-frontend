import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleResumeComponent } from './sale-resume.component';

describe('SaleResumeComponent', () => {
  let component: SaleResumeComponent;
  let fixture: ComponentFixture<SaleResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
