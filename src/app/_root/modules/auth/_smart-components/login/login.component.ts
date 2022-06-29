import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from 'src/app/_core/components/forms/abstract-form.component';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends AbstractFormComponent {
  readonly: boolean = true;
  constructor(private readonly _authService: AuthService, _fb: FormBuilder) {
    super(_fb);
    this.initForm();
  }

  // login on form submission
  // zaloguj po wysłaniu formularza

  onSubmit(): void {
    if (this.formGroup.valid) {
      this._authService.logIn(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  // init login form
  // inicjalizacja formularza logowania

  initForm(): void {
    this.formGroup = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
}
