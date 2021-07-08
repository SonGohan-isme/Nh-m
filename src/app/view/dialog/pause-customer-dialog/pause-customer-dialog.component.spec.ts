import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseCustomerDialogComponent } from './pause-customer-dialog.component';

describe('PauseCustomerDialogComponent', () => {
  let component: PauseCustomerDialogComponent;
  let fixture: ComponentFixture<PauseCustomerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseCustomerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
