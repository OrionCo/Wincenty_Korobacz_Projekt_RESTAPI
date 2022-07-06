import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, take } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth.service';
import { TestService } from 'src/app/_core/services/tests.service';
import { Test } from 'src/models/test.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-results',
  styleUrls: ['./results.component.scss'],
  templateUrl: './results.component.html',
})
export class ResultsComponent implements OnInit {
  data$!: Observable<Test.Results[]>;
  private _user: UserModel.User | null = null;
  categories = this._testService.getCategories().pipe(
    map((categories) => {
      return categories.filter((val) => val !== null);
    })
  );

  constructor(
    private readonly _testService: TestService,
    private readonly _authService: AuthService
  ) {
    // get user and results data
    // pobranie danych użytkownika i jego wyników

    this._authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      this._user = user;
      this.data$ = this._testService.getResults(this._user?.email!);
    });
  }

  ngOnInit(): void {}
}
