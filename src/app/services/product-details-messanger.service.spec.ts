import { TestBed } from '@angular/core/testing';

import { ProductDetailsMessangerService } from './product-details-messanger.service';

describe('ProductDetailsMessangerService', () => {
  let service: ProductDetailsMessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsMessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
