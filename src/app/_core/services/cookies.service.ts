import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import Cookie, { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

/*
 * Cookie service facilitates getting and setting cookies.
 *
 * Cookie service ułatwia pobieranie i ustawianie ciasteczek.
 */

@Injectable()
export class CookiesService {
  private _serverCookies!: Cookie;
  private _browserCookies!: Cookie;

  constructor(@Inject(PLATFORM_ID) private readonly _platformId: Object) {}

  private get _cookies(): Cookie {
    if (isPlatformBrowser(this._platformId)) {
      if (!this._browserCookies) {
        this._browserCookies = new Cookie();
      }
      return this._browserCookies;
    }
    return this._serverCookies;
  }

  get(name: string, options?: CookieGetOptions): string | undefined {
    return this._cookies.get(name, options);
  }

  set(name: string, value: string, options?: CookieSetOptions): void {
    this._cookies.set(name, value, { path: '/', ...options });
  }

  remove(name: string, options?: CookieSetOptions): void {
    this._cookies.remove(name, { path: '/', ...options });
  }

  setUserCookies(data: { token: string }): void {
    this.set('token', data.token);
  }

  getUserCookies(): { token: string } | null {
    const token: string | undefined = this.get('token');

    return token ? { token } : null;
  }

  deleteUserCookies(): void {
    this.remove('token');
  }

  deleteAllCookies(): void {
    Object.keys(this._cookies.getAll() || {}).forEach((key: string) => {
      this.remove(key);
    });
  }
}
