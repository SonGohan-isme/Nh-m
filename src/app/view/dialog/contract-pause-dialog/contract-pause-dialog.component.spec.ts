import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractPauseDialogComponent } from './contract-pause-dialog.component';

describe('ContractPauseDialogComponent', () => {
  let component: ContractPauseDialogComponent;
  let fixture: ComponentFixture<ContractPauseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractPauseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractPauseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
