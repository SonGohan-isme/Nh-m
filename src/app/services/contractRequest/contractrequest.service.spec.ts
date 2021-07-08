import { TestBed } from '@angular/core/testing';

import { ContractrequestService } from './contractrequest.service';

describe('ContractrequestService', () => {
  let service: ContractrequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractrequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
