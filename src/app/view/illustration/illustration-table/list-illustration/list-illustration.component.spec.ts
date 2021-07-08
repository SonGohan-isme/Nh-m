import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIllustrationComponent } from './list-illustration.component';

describe('ListIllustrationComponent', () => {
  let component: ListIllustrationComponent;
  let fixture: ComponentFixture<ListIllustrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListIllustrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListIllustrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
