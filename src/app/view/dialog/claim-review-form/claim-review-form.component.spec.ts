import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimReviewFormComponent } from './claim-review-form.component';

describe('ClaimReviewFormComponent', () => {
  let component: ClaimReviewFormComponent;
  let fixture: ComponentFixture<ClaimReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
