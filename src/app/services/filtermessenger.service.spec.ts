import { TestBed } from '@angular/core/testing';

import { FiltermessengerService } from './filtermessenger.service';

describe('FiltermessengerService', () => {
  let service: FiltermessengerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltermessengerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
