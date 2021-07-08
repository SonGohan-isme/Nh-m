import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailContractComponent } from './view-detail-contract.component';

describe('ViewDetailContractComponent', () => {
  let component: ViewDetailContractComponent;
  let fixture: ComponentFixture<ViewDetailContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
