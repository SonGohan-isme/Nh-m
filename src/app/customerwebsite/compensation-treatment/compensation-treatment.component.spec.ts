import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompensationTreatmentComponent } from './compensation-treatment.component';

describe('CompensationTreatmentComponent', () => {
  let component: CompensationTreatmentComponent;
  let fixture: ComponentFixture<CompensationTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompensationTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompensationTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
