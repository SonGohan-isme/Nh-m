import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditInfoComponent } from './customer-edit-info.component';

describe('CustomerEditInfoComponent', () => {
  let component: CustomerEditInfoComponent;
  let fixture: ComponentFixture<CustomerEditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
