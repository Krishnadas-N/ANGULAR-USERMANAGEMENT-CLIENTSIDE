import { TestBed } from '@angular/core/testing';

import { TokenExpireService } from './token-expire.service';
import { beforeEach, describe, it } from 'node:test';

describe('TokenExpireService', () => {
  let service: TokenExpireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenExpireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
