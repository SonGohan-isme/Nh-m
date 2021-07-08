import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionHistoryComponent } from './solution-history.component';

describe('SolutionHistoryComponent', () => {
  let component: SolutionHistoryComponent;
  let fixture: ComponentFixture<SolutionHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
