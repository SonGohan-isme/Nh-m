import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMailDialogComponent } from './add-mail-dialog.component';

describe('AddMailDialogComponent', () => {
  let component: AddMailDialogComponent;
  let fixture: ComponentFixture<AddMailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
