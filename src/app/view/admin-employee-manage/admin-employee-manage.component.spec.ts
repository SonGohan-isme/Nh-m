import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployeeManageComponent } from './admin-employee-manage.component';

describe('AdminEmployeeManageComponent', () => {
  let component: AdminEmployeeManageComponent;
  let fixture: ComponentFixture<AdminEmployeeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEmployeeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmployeeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
