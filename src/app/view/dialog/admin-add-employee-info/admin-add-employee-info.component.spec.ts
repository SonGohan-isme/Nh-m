import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEmployeeInfoComponent } from './admin-add-employee-info.component';

describe('AdminAddEmployeeInfoComponent', () => {
  let component: AdminAddEmployeeInfoComponent;
  let fixture: ComponentFixture<AdminAddEmployeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddEmployeeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
