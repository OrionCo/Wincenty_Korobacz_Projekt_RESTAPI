import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

/*
 * Intercept requests and set
 * the correct request headers and request URL to the API.
 *
 * Interceptor przechwytuje requesty
 * do API i ustawia jego poprawny adres
 * URL. (dzięki temu nie trzeba za każdym
 * razem pisać całego URL, np:
 * http://api.url:port/sciezka-do-endpointu,
 * wystarczy sama nazwa endpointu).
 */

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = this._setURL(req);
    req = this._setContentType(req);
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

  private _setContentType(request: HttpRequest<any>): HttpRequest<any> {
    if (!request.headers.get('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    return request;
  }
}
