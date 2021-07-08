import { TestBed } from '@angular/core/testing';

import { RelatedPersonService } from './related-person.service';

describe('RelatedPersonService', () => {
  let service: RelatedPersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatedPersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
