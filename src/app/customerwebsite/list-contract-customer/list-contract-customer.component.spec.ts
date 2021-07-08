import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListContractCustomerComponent } from './list-contract-customer.component';

describe('ListContractCustomerComponent', () => {
  let component: ListContractCustomerComponent;
  let fixture: ComponentFixture<ListContractCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListContractCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListContractCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
