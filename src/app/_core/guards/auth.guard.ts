import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, take, map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

/*
 * Auth guard redirects the user to the login page if
 * they are not logged in.
 *
 * Auth guard przekierowuje użytkownika do strony
 * logowania, jeśli nie jest on zalogowany.
 *
 */

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._authService.loggedIn$.pipe(
      take(1),
      map((loggedIn: boolean) => {
        if (loggedIn) {
          return true;
        } else {
          this._router.navigate(['/auth']);
          return false;
        }
      }),
      catchError(() => {
        this._router.navigate(['/auth']);
        return of(false);
      })
    );
  }
}
