import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionTableComponent } from './commission-table.component';

describe('CommissionTableComponent', () => {
  let component: CommissionTableComponent;
  let fixture: ComponentFixture<CommissionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommissionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
