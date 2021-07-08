import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInfoChangeHistoryComponent } from './detail-info-change-history.component';

describe('DetailInfoChangeHistoryComponent', () => {
  let component: DetailInfoChangeHistoryComponent;
  let fixture: ComponentFixture<DetailInfoChangeHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInfoChangeHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInfoChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
