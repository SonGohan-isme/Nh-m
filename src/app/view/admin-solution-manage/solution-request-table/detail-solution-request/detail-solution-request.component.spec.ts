import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSolutionRequestComponent } from './detail-solution-request.component';

describe('DetailSolutionRequestComponent', () => {
  let component: DetailSolutionRequestComponent;
  let fixture: ComponentFixture<DetailSolutionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSolutionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSolutionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
