import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIncomeComponent } from './detail-income.component';

describe('DetailIncomeComponent', () => {
  let component: DetailIncomeComponent;
  let fixture: ComponentFixture<DetailIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
