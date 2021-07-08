import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserRequestManageComponent } from './appraiser-request-manage.component';

describe('AppraiserRequestManageComponent', () => {
  let component: AppraiserRequestManageComponent;
  let fixture: ComponentFixture<AppraiserRequestManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraiserRequestManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiserRequestManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
