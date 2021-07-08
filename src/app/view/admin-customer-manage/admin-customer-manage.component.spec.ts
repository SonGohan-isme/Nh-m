import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerManageComponent } from './admin-customer-manage.component';

describe('AdminCustomerManageComponent', () => {
  let component: AdminCustomerManageComponent;
  let fixture: ComponentFixture<AdminCustomerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCustomerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCustomerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
