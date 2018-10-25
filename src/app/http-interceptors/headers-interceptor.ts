import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  private prepareRequest(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({ params: request.params.set('access_key', '430c345c3c65ec9dde15af243324b22c') });
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.prepareRequest(req));
  }
}
