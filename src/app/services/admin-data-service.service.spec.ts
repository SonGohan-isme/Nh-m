import { TestBed } from '@angular/core/testing';

import { AdminDataServiceService } from './admin-data-service.service';

describe('AdminDataServiceService', () => {
  let service: AdminDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
