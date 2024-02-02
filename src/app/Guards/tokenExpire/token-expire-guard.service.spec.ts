import { TestBed } from '@angular/core/testing';

import { TokenExpireGuardService } from './token-expire-guard.service';

describe('TokenExpireGuardService', () => {
  let service: TokenExpireGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpireGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
