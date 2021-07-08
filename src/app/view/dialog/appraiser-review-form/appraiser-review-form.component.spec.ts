import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserReviewFormComponent } from './appraiser-review-form.component';

describe('AppraiserReviewFormComponent', () => {
  let component: AppraiserReviewFormComponent;
  let fixture: ComponentFixture<AppraiserReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraiserReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiserReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
