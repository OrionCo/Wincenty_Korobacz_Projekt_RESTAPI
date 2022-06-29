import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, tap } from 'rxjs';
import { AbstractFormComponent } from 'src/app/_core/components/forms/abstract-form.component';
import { AuthService } from 'src/app/_core/services/auth.service';
import { TestsService } from 'src/app/_core/services/tests.service';
import { FormModel } from 'src/models/form.model';
import { Test } from 'src/models/test.model';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-test-form',
  styleUrls: ['./test-form.component.scss'],
  templateUrl: './test-form.component.html',
})
export class TestFormComponent extends AbstractFormComponent implements OnInit {
  categories: FormModel.CategoryOption[] = Test.CategoryOptions;
  questions: any[] = [];
  correctAnswers: any[] = [];
  givenAnswers: any[] = [];
  _user: UserModel.User | null = null;

  data: any;
  constructor(
    private readonly _testsService: TestsService,
    private readonly _snackBar: MatSnackBar,
    private readonly _authService: AuthService,
    _fb: FormBuilder
  ) {
    super(_fb);
    // init test form
    // inicjalizacja formularza testu

    this.formGroup = this._fb.group({
      category: [],
      questions: this._fb.array([]),
    });
  }

  ngOnInit(): void {
    // get user data
    // pobranie danych użytkownika

    this._authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      this._user = user;
    });
  }

  // get test data and add question/answer form controls
  // pobranie danych testu i dodanie kontrolek formularza
  // odpowiadających za pytania i odpowiedzi

  getTest(category: number) {
    this._testsService
      .getTest(category)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          this.data = data;
          if (data) {
            this.questions = data.questions;
            this.getFormArray('questions').clear();
            this.questions.forEach((question: any) => {
              this.getFormArray('questions').push(
                this.addQuestionFormGroup(question)
              );
            });
          } else {
            this._snackBar.open('Nie pobrano żadnych pytań.', undefined, {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            });
          }
        },
        error: (err) => {
          this._snackBar.open(err, undefined, {
            duration: 3000,
            panelClass: ['mat-warn', 'mat-toolbar'],
          });
        },
      });
  }

  private addQuestionFormGroup(question: any): FormGroup {
    return this._fb.group({
      name: [question.name],
      answers: new FormControl(),
    });
  }

  // on submit add all correct answers to array
  // przy wysłaniu formularza dodaj wszystkie
  // poprawne odpowiedzi do tablicy

  onSubmit(): void {
    const val = this.formGroup.getRawValue();
    this.questions.forEach((question) => {
      question.answers.forEach((answer: any) => {
        if (answer.correct) {
          this.correctAnswers.push(answer);
        }
      });
    });

    // count score
    // obliczanie wyniku

    let score = 0;

    val.questions.forEach((question: any, index: number) => {
      if (question.answers === this.correctAnswers[index]) score++;
    });

    // prepare request payload
    // przygotowanie zawartości requestu

    const results: Test.Results = {
      email: this._user?.email!,
      max_score: this.questions.length,
      score: score,
      value: val,
    };
    this._testsService.sendResult(results).subscribe({
      next: () => {
        this._snackBar.open('Poprawnie zapisano odpowiedzi.', '', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-success'],
        });
      },
      error: (err) => {
        this._snackBar.open('Wystąpił błąd przy wysyłaniu odpowiedzi.', '', {
          duration: 3000,
          panelClass: ['mat-warn', 'mat-toolbar'],
        });
      },
    });
  }
}
