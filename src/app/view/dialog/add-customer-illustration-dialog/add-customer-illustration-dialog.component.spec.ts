import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerIllustrationDialogComponent } from './add-customer-illustration-dialog.component';

describe('AddCustomerIllustrationDialogComponent', () => {
  let component: AddCustomerIllustrationDialogComponent;
  let fixture: ComponentFixture<AddCustomerIllustrationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCustomerIllustrationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerIllustrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
