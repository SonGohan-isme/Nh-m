import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddInfoDialogComponent } from './customer-add-info-dialog.component';

describe('CustomerAddInfoDialogComponent', () => {
  let component: CustomerAddInfoDialogComponent;
  let fixture: ComponentFixture<CustomerAddInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
