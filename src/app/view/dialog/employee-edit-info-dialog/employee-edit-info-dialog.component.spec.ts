import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditInfoDialogComponent } from './employee-edit-info-dialog.component';

describe('EmployeeEditInfoDialogComponent', () => {
  let component: EmployeeEditInfoDialogComponent;
  let fixture: ComponentFixture<EmployeeEditInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
