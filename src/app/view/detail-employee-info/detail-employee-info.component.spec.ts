import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployeeInfoComponent } from './detail-employee-info.component';

describe('DetailEmployeeInfoComponent', () => {
  let component: DetailEmployeeInfoComponent;
  let fixture: ComponentFixture<DetailEmployeeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEmployeeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmployeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
