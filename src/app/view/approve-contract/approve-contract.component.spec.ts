import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveContractComponent } from './approve-contract.component';

describe('ApproveContractComponent', () => {
  let component: ApproveContractComponent;
  let fixture: ComponentFixture<ApproveContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
