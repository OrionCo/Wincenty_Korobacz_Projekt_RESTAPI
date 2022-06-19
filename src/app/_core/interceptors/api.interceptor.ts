import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this._setURL(req);
    return next.handle(req);
  }

  private _setURL(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.url.startsWith('http')) {
      request = request.clone({
        url: `${environment.apiUrl}/${request.url}`,
      });
    }

    return request;
  }
}
