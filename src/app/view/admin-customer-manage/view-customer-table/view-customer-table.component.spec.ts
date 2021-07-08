import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCustomerTableComponent } from './view-customer-table.component';

describe('ViewCustomerTableComponent', () => {
  let component: ViewCustomerTableComponent;
  let fixture: ComponentFixture<ViewCustomerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCustomerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
