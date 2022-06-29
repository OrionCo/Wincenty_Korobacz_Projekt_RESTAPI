import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthModel } from 'src/models/auth.model';
import { UserModel } from 'src/models/user.model';
import { CookiesService } from './cookies.service';

/*
 * Auth service handles all business logic regarding the user.
 * Stores the user subject/observable and handles the
 * login/register/logout processes.
 *
 * Auth service zawiera całą logikę biznesową odnoszącą się
 * do użytkownika. Jest odpowiedzialny za przechowywanie
 * danych użytkownika i procesy logowania/rejestracji/wylogowania.
 */

@Injectable()
export class AuthService {
  private _loggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this._loggedInSubject.asObservable();
  private _userSubject$: BehaviorSubject<UserModel.User | null> =
    new BehaviorSubject<UserModel.User | null>(null);
  loggedUser$: Observable<UserModel.User | null> =
    this._userSubject$.asObservable();

  constructor(
    private readonly _router: Router,
    private readonly _http: HttpClient,
    private readonly _snackbar: MatSnackBar,
    private readonly _cookieService: CookiesService
  ) {
    // Get loggedin cookie - if it exists and is set to true,
    // set the loggedin subject to true.
    //
    // Pobieranie ciasteczka loggedin - jeśli istnieje i ma wartość
    // true, ustawia wartość loggedin subjecta na true.

    let loggedIn = this._cookieService.get('loggedIn');
    if (loggedIn === 'true') {
      this._loggedInSubject.next(true);
      let user: UserModel.User = JSON.parse(
        decodeURIComponent(this._cookieService.get('loggedUser')!)
      ) as UserModel.User;
      if (user) {
        this._userSubject$.next(user);
      }
    } else {
      this._loggedInSubject.next(false);
    }
  }

  // TODO: JWT auth

  /*
   * Log in process - set the loggedin subject to true, set
   * the cookie to true, and save the user email in a cookie as well.
   * Then redirect user to dashboard.
   *
   * Proces logowania - ustawia ciasteczko i subject loggedin jako true,
   * i zapisuje mail użytkownika w ciasteczku. Później
   * przekierowuje użytkownika do strony głównej
   */

  logIn(data: AuthModel.LoginRequest): void {
    this._http
      .post<AuthModel.LoginRequest>('auth/login', data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._loggedInSubject.next(true);
          this._cookieService.set('loggedIn', 'true');
          let cookie = JSON.stringify({ email: data.email });
          this._cookieService.set('loggedUser', encodeURIComponent(cookie));
          this._userSubject$.next(JSON.parse(cookie));
          this._router.navigate(['/']);
          this._snackbar.open('Pomyślnie zalogowano.', '', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-success'],
          });
        },
        error: (err) => {
          this._snackbar.open(err.error.message, '', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        },
      });
  }

  /*
   * Log out process - mirror all actions in the login process
   * and redirect user to the login page.
   *
   * Proces wylogowywania - odwrotny do procesu logowania.
   * Następnie przekierowuje do strony logowania.
   */

  logOut(): void {
    this._loggedInSubject.next(false);
    this._cookieService.set('loggedIn', 'false');
    this._userSubject$.next(null);
    this._cookieService.remove('loggedUser');
    this._router.navigate(['/auth']);
    this._snackbar.open('Pomyślnie wylogowano.', '', {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-success'],
    });
  }

  /*
   * Registration process - send data to the signup endpoint
   * and redirect user to the login page on success.
   *
   * Proces rejestracji - wysyłka danych na odpowiedni endpoint
   * i przekierowanie użytkownika do strony logowania w przypadku
   * powodzenia.
   */

  register(data: AuthModel.RegisterRequest): void {
    this._http
      .post<AuthModel.RegisterRequest>('auth/signup', data)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._router.navigate(['/']);
          this._snackbar.open(
            'Rejestracja przebiegła pomyślnie. Możesz się zalogować',
            '',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-success'],
            }
          );
        },
        error: (err) => {
          this._snackbar.open(`${err.error.message}`, '', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn'],
          });
        },
      });
  }
}
