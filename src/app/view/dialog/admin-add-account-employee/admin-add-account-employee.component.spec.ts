import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAccountEmployeeComponent } from './admin-add-account-employee.component';

describe('AdminAddAccountEmployeeComponent', () => {
  let component: AdminAddAccountEmployeeComponent;
  let fixture: ComponentFixture<AdminAddAccountEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddAccountEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddAccountEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
