import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomerDialogComponent } from './report-customer-dialog.component';

describe('ReportCustomerDialogComponent', () => {
  let component: ReportCustomerDialogComponent;
  let fixture: ComponentFixture<ReportCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
