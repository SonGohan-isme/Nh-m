import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionManageComponent } from './admin-commission-manage.component';

describe('AdminCommissionManageComponent', () => {
  let component: AdminCommissionManageComponent;
  let fixture: ComponentFixture<AdminCommissionManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommissionManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
