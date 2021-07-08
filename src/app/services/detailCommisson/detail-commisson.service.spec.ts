import { TestBed } from '@angular/core/testing';

import { DetailCommissonService } from './detail-commisson.service';

describe('DetailCommissonService', () => {
  let service: DetailCommissonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailCommissonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
