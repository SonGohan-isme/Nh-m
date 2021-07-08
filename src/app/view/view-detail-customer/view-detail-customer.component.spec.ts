import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailCustomerComponent } from './view-detail-customer.component';

describe('ViewDetailCustomerComponent', () => {
  let component: ViewDetailCustomerComponent;
  let fixture: ComponentFixture<ViewDetailCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
