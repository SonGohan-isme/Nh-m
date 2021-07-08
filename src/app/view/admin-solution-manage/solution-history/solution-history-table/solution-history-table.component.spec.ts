import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionHistoryTableComponent } from './solution-history-table.component';

describe('SolutionHistoryTableComponent', () => {
  let component: SolutionHistoryTableComponent;
  let fixture: ComponentFixture<SolutionHistoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionHistoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
