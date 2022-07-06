import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { AbstractFormComponent } from 'src/app/_core/components/forms/abstract-form.component';
import { AuthService } from 'src/app/_core/services/auth.service';
import { TestService } from 'src/app/_core/services/tests.service';
import { UserModel } from 'src/models/user.model';

@Component({
  selector: 'app-new-test-form',
  templateUrl: './new-test-form.component.html',
  styleUrls: ['./new-test-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTestFormComponent
  extends AbstractFormComponent
  implements OnInit
{
  questions: any[] = [];
  correctAnswers: any[] = [];
  givenAnswers: any[] = [];
  _user: UserModel.User | null = null;
  editMode: boolean = false;
  data: any;
  category?: string;

  constructor(
    _fb: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar,
    private _testsService: TestService,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    super(_fb);
    this.formGroup = this._fb.group({
      category: [this.data?.category ?? null, Validators.required],
      questions: this._fb.array([]),
    });

    if (this.route.snapshot.params['category']) {
      this.category = this.route.snapshot.params['category'];
      this.editMode = true;
      this.getTest(this.category!);
    }
  }

  ngOnInit(): void {
    // get user data
    // pobranie danych użytkownika

    this._authService.loggedUser$.pipe(take(1)).subscribe((user) => {
      this._user = user;
    });
  }

  getTest(category: string): void {
    this._testsService
      .getTest(category)
      .pipe(take(1))
      .subscribe({
        next: (data) => {
          if (data) {
            delete (data as any)._id;
            this.data = data;
            this.questions = data.questions;
            this.getFormArray('questions').clear();
            this.questions.forEach((question: any, index: number) => {
              this.addQuestionFormGroup(question);
              question.answers.forEach(() => {
                this.addAnswersFormGroup(index);
              });
            });
            this.formGroup.patchValue(data);
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

  addQuestionFormGroup(question?: any): void {
    this.getFormArray('questions').push(
      this._fb.group({
        name: [question?.name ?? null, Validators.required],
        answers: new FormArray([]),
      })
    );

    this._cdr.markForCheck();
  }

  addAnswersFormGroup(position: number): void {
    this.getAnswersFormArray(position)?.push(
      this._fb.group({
        name: [null, Validators.required],
        correct: [false],
      })
    );

    this._cdr.markForCheck();
  }

  getCorrectControl(i: number, j: number): FormControl {
    return this.getAnswersFormArray(i).at(j).get('correct') as FormControl;
  }

  getAnswersFormArray(position: number): FormArray {
    return this.getFormArray('questions')
      .at(position)
      .get('answers') as FormArray;
  }

  // on submit add all correct answers to array
  // przy wysłaniu formularza dodaj wszystkie
  // poprawne odpowiedzi do tablicy

  onSubmit(): void {
    if (this.formGroup.valid) {
      const val = this.formGroup.getRawValue();
      if (this.editMode) {
        this._testsService.updateTest(val, this.category!).subscribe({
          next: () => {
            this._snackBar.open('Poprawnie zapisano zmiany.', '', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-success'],
            });
            this._router.navigate([`/tests/edit/${val.category}`]);
          },
          error: (err) => {
            this._snackBar.open('Wystąpił błąd przy zapisywaniu zmian.', '', {
              duration: 3000,
              panelClass: ['mat-warn', 'mat-toolbar'],
            });
          },
        });
      } else {
        this._testsService.createTest(val).subscribe({
          next: () => {
            this._snackBar.open('Poprawnie utworzono test.', '', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-success'],
            });
            this._router.navigate(['/tests']);
          },
          error: (err) => {
            this._snackBar.open('Wystąpił błąd przy tworzeniu testu.', '', {
              duration: 3000,
              panelClass: ['mat-warn', 'mat-toolbar'],
            });
          },
        });
      }
    } else {
      this.formGroup.markAllAsTouched();
      this._snackBar.open('Uzupełnij wymagane pola.', '', {
        duration: 3000,
        panelClass: ['mat-warn', 'mat-toolbar'],
      });
    }
  }
}
