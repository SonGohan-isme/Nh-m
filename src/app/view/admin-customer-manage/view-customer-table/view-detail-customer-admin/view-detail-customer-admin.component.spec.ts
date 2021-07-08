import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailCustomerAdminComponent } from './view-detail-customer-admin.component';

describe('ViewDetailCustomerAdminComponent', () => {
  let component: ViewDetailCustomerAdminComponent;
  let fixture: ComponentFixture<ViewDetailCustomerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailCustomerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailCustomerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
