import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimGuideComponent } from './claim-guide.component';

describe('ClaimGuideComponent', () => {
  let component: ClaimGuideComponent;
  let fixture: ComponentFixture<ClaimGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
