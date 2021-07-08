import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetContactInfoComponent } from './get-contact-info.component';

describe('GetContactInfoComponent', () => {
  let component: GetContactInfoComponent;
  let fixture: ComponentFixture<GetContactInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetContactInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
