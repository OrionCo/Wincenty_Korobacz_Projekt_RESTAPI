import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AuthModel } from 'src/models/auth.model';
import { UserModel } from 'src/models/user.model';
import { CookiesService } from './cookies.service';

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
