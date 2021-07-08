import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserContractManageComponent } from './appraiser-contract-manage.component';

describe('AppraiserContractManageComponent', () => {
  let component: AppraiserContractManageComponent;
  let fixture: ComponentFixture<AppraiserContractManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraiserContractManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraiserContractManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
