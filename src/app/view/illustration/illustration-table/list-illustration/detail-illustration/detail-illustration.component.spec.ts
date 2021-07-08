import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailIllustrationComponent } from './detail-illustration.component';

describe('DetailIllustrationComponent', () => {
  let component: DetailIllustrationComponent;
  let fixture: ComponentFixture<DetailIllustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailIllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
