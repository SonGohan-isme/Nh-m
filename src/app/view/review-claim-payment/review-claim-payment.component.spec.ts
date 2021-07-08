import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewClaimPaymentComponent } from './review-claim-payment.component';

describe('ReviewClaimPaymentComponent', () => {
  let component: ReviewClaimPaymentComponent;
  let fixture: ComponentFixture<ReviewClaimPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewClaimPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewClaimPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
