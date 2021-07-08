import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRequestManageComponent } from './claim-request-manage.component';

describe('ClaimRequestManageComponent', () => {
  let component: ClaimRequestManageComponent;
  let fixture: ComponentFixture<ClaimRequestManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimRequestManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimRequestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
