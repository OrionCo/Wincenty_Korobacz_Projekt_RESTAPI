import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/_core/services/auth.service';
import { TestsService } from 'src/app/_core/services/tests.service';
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
  categories = Test.CategoriesNames;

  constructor(
    private readonly _testsService: TestsService,
    private readonly _authService: AuthService
  ) {
    // get user and results data
    // pobranie danych użytkownika i jego wyników

    this._authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      this._user = user;
      this.data$ = this._testsService.getResults(this._user?.email!);
    });
  }

  ngOnInit(): void {}
}
