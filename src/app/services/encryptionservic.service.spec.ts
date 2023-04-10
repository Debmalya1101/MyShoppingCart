import { TestBed } from '@angular/core/testing';

import { EncryptionservicService } from './encryptionservic.service';

describe('EncryptionservicService', () => {
  let service: EncryptionservicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionservicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
