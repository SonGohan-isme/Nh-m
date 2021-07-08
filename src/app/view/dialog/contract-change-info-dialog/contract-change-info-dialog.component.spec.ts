import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractChangeInfoDialogComponent } from './contract-change-info-dialog.component';

describe('ContractChangeInfoDialogComponent', () => {
  let component: ContractChangeInfoDialogComponent;
  let fixture: ComponentFixture<ContractChangeInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractChangeInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractChangeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
