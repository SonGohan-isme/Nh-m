import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationDetailDialogComponent } from './illustration-detail-dialog.component';

describe('IllustrationDetailDialogComponent', () => {
  let component: IllustrationDetailDialogComponent;
  let fixture: ComponentFixture<IllustrationDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustrationDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
