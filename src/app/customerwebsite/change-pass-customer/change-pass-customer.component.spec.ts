import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePassCustomerComponent } from './change-pass-customer.component';

describe('ChangePassCustomerComponent', () => {
  let component: ChangePassCustomerComponent;
  let fixture: ComponentFixture<ChangePassCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePassCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePassCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
