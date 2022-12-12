import { TestBed } from '@angular/core/testing';

import { OrderDetailstoPaymentMessangerService } from './order-detailsto-payment-messanger.service';

describe('OrderDetailstoPaymentMessangerService', () => {
  let service: OrderDetailstoPaymentMessangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailstoPaymentMessangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
