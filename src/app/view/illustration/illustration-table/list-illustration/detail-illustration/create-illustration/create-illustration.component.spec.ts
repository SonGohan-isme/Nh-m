import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIllustrationComponent } from './create-illustration.component';

describe('CreateIllustrationComponent', () => {
  let component: CreateIllustrationComponent;
  let fixture: ComponentFixture<CreateIllustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateIllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
