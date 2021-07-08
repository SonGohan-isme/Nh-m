import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClaimComponent } from './detail-claim.component';

describe('DetailClaimComponent', () => {
  let component: DetailClaimComponent;
  let fixture: ComponentFixture<DetailClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
