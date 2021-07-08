import { TestBed } from '@angular/core/testing';

import { RefertableService } from './refertable.service';

describe('RefertableService', () => {
  let service: RefertableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefertableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
