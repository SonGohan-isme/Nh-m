import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IllustrationTableComponent } from './illustration-table.component';

describe('IllustrationTableComponent', () => {
  let component: IllustrationTableComponent;
  let fixture: ComponentFixture<IllustrationTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IllustrationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IllustrationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
