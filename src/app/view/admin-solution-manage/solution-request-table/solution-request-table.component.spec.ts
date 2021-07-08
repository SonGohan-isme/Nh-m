import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionRequestTableComponent } from './solution-request-table.component';

describe('SolutionRequestTableComponent', () => {
  let component: SolutionRequestTableComponent;
  let fixture: ComponentFixture<SolutionRequestTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionRequestTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
