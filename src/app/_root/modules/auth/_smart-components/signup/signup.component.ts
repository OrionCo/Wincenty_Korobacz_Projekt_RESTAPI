import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AbstractFormComponent } from 'src/app/_core/components/forms/abstract-form.component';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.scss'],
  templateUrl: './signup.component.html',
})
export class SignupComponent extends AbstractFormComponent {
  passwordsMismatch: boolean = false;
  passwordControl?: AbstractControl | null;
  confirmPasswordControl?: AbstractControl | null;

  constructor(private readonly _authService: AuthService, _fb: FormBuilder) {
    super(_fb);
    this.initForm();
  }

  // compare passwords and display error message if they do not match
  // porównanie haseł, i wyświetlenie błędu jeśli nie są identyczne

  comparePasswords(): void {
    if (this.passwordControl && this.confirmPasswordControl) {
      if (this.passwordControl.value !== this.confirmPasswordControl.value) {
        this.passwordsMismatch = true;
      } else {
        this.passwordsMismatch = false;
      }
    }
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this._authService.register(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  // init registration form
  // inicjalizacja formularza rejestracji

  initForm(): void {
    this.formGroup = this._fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      confirm_password: [null, Validators.required],
    });

    this.passwordControl = this.formGroup.get('password');
    this.confirmPasswordControl = this.formGroup.get('confirm_password');
  }
}
