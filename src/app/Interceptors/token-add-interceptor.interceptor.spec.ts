import { TestBed } from '@angular/core/testing';
import { HttpRequest } from '@angular/common/http';
import { jasmine } from '@angular-devkit/build-angular/node_modules/@angular-devkit/build-angular/src/karma';
import { MockInstance } from 'ng-mocks';

import { TokenAddInterceptorInterceptor } from './token-add-interceptor.interceptor';

describe('tokenAddInterceptorInterceptor', () => {
  let interceptor: TokenAddInterceptorInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenAddInterceptorInterceptor]
    });

    interceptor = TestBed.inject(TokenAddInterceptorInterceptor);
    MockInstance(localStorage, { getItem: () => 'mock-token' });
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add the authorization header', () => {
    const req = new HttpRequest('GET', '/test');
    const mockNext = jasmine.createSpyObj('HttpHandler', ['handle']);

    interceptor.intercept(req, mockNext);

    expect(req.headers.get('Authorization')).toBe('Bearer mock-token');
  });
});
