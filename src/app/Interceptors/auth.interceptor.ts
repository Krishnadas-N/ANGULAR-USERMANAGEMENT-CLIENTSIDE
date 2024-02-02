import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor Working //////////////////////////////////////////////// ");
    console.log(typeof window);

    const token = localStorage.getItem('token');
    console.log(token, typeof localStorage);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Use Angular's logging service
    console.debug("Interceptor Working //////////////////////////////////////////////// ");

    return next.handle(request);
  }
}
