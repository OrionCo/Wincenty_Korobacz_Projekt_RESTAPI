import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

/*
 * LoggedInGuard prevents user
 * from accessing the register/login pages
 * when they are already logged in.
 *
 * LoggedInGuard przekierowuje użytkownika
 * do strony głównej, jeśli jest on już zalogowany
 *
 */

@Injectable()
export class LoggedInGuard implements CanActivate {
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
          this._router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
