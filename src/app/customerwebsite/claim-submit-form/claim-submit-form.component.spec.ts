import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSubmitFormComponent } from './claim-submit-form.component';

describe('ClaimSubmitFormComponent', () => {
  let component: ClaimSubmitFormComponent;
  let fixture: ComponentFixture<ClaimSubmitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSubmitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
