import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChangePassComponent } from './confirm-change-pass.component';

describe('ConfirmChangePassComponent', () => {
  let component: ConfirmChangePassComponent;
  let fixture: ComponentFixture<ConfirmChangePassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmChangePassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
