import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth.service';
import { TestService } from 'src/app/_core/services/tests.service';
import { Test } from 'src/models/test.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  _user?: UserModel.User | null;
  user$: Observable<UserModel.User | null> = this._authService.loggedUser$;
  data$?: Observable<Test.Results[]>;
  _data?: Test.Results[];
  average_score: number = 0;
  categories = Test.CategoriesNames;

  constructor(
    private readonly _authService: AuthService,
    private readonly _testsService: TestService,
    private readonly _cdr: ChangeDetectorRef
  ) {
    // get user data and results
    // pobieranie danych użytkownika i jego wyników

    this._authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      this._user = user;
      this.data$ = this._testsService.getResults(this._user?.email!);
    });

    // calculate average user score
    // obliczenie średniego wyniku testów użytkownika
    this.data$?.subscribe((data) => {
      if (data.length) {
        this._data = data;
        this._data.forEach((result) => {
          this.average_score += result.score / result.max_score;
        });
        this.average_score /= this._data.length;
        this._cdr.markForCheck();
      }
    });
  }
}
