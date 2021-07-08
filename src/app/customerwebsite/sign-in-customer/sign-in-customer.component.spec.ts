import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInCustomerComponent } from './sign-in-customer.component';

describe('SignInCustomerComponent', () => {
  let component: SignInCustomerComponent;
  let fixture: ComponentFixture<SignInCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
