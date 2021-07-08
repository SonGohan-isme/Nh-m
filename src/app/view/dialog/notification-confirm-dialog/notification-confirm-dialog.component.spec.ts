import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationConfirmDialogComponent } from './notification-confirm-dialog.component';

describe('NotificationConfirmDialogComponent', () => {
  let component: NotificationConfirmDialogComponent;
  let fixture: ComponentFixture<NotificationConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
