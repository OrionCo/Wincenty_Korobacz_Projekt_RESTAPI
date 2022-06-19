import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClassProvider } from '@angular/core';
import { ApiInterceptor } from './api.interceptor';

export const interceptors: any[] = [ApiInterceptor];

export const CORE_INTERCEPTORS: ClassProvider[] = interceptors.map(
  (customInterceptor: any) => ({
    provide: HTTP_INTERCEPTORS,
    useClass: customInterceptor,
    multi: true,
  })
);
