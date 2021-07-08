import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPauseEmployeeDialogComponent } from './admin-pause-employee-dialog.component';

describe('AdminPauseEmployeeDialogComponent', () => {
  let component: AdminPauseEmployeeDialogComponent;
  let fixture: ComponentFixture<AdminPauseEmployeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPauseEmployeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPauseEmployeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
