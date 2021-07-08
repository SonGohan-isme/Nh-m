import { TestBed } from '@angular/core/testing';

import { CustomerWebServiceService } from './customer-web-service.service';

describe('CustomerWebServiceService', () => {
  let service: CustomerWebServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerWebServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
