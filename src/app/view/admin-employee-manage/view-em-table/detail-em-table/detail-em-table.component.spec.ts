import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmTableComponent } from './detail-em-table.component';

describe('DetailEmTableComponent', () => {
  let component: DetailEmTableComponent;
  let fixture: ComponentFixture<DetailEmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
