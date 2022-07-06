import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AbstractFormComponent } from 'src/app/_core/components/forms/abstract-form.component';
import { TestService } from 'src/app/_core/services/tests.service';
import { Test } from 'src/models/test.model';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestListComponent extends AbstractFormComponent {
  data$: Observable<Test.TestAnswers[]> = this._testService.getAllTests();
  categories = Test.CategoriesNames;

  constructor(
    private _testService: TestService,
    private readonly _snackBar: MatSnackBar,
    private readonly _cdr: ChangeDetectorRef,
    _fb: FormBuilder
  ) {
    super(_fb);
    this.formGroup = this._fb.group({
      search: [null, Validators.required],
    });
  }

  getData(): void {
    this.data$ = this._testService.getAllTests();
  }

  search(): void {
    let search = this.formGroup.getRawValue().search;
    if (search) {
      this.data$ = this._testService.searchTests(search);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  clearSearch(): void {
    if (this.getControl('search').value) {
      this.getData();
    }
  }

  deleteHandler(category: string): void {
    this._testService.deleteTest(category).subscribe({
      next: () => {
        this._snackBar.open('Pomyślnie usunięto test.', '', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-success'],
        });
        this.getData();
      },
      error: (err) => {
        this._snackBar.open('Wystąpił błąd przy usuwaniu testu.', '', {
          duration: 3000,
          panelClass: ['mat-warn', 'mat-toolbar'],
        });
      },
    });
  }
}
