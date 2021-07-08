import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSolutionManageComponent } from './admin-solution-manage.component';

describe('AdminSolutionManageComponent', () => {
  let component: AdminSolutionManageComponent;
  let fixture: ComponentFixture<AdminSolutionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSolutionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSolutionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
