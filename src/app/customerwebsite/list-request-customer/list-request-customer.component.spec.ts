import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestCustomerComponent } from './list-request-customer.component';

describe('ListRequestCustomerComponent', () => {
  let component: ListRequestCustomerComponent;
  let fixture: ComponentFixture<ListRequestCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRequestCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
