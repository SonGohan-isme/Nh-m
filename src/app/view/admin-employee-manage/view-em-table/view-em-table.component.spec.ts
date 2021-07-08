import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmTableComponent } from './view-em-table.component';

describe('ViewEmTableComponent', () => {
  let component: ViewEmTableComponent;
  let fixture: ComponentFixture<ViewEmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
