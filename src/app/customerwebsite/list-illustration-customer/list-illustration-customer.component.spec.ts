import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIllustrationCustomerComponent } from './list-illustration-customer.component';

describe('ListIllustrationCustomerComponent', () => {
  let component: ListIllustrationCustomerComponent;
  let fixture: ComponentFixture<ListIllustrationCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIllustrationCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIllustrationCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
