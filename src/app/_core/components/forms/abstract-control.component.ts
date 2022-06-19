import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Directive()
export abstract class AbstractControlComponent<T>
  implements ControlValueAccessor
{
  @Input() formControl!: FormControl;
  @Input() placeholder!: string;
  @Input() type!: string;

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('readonly') isReadonly: boolean = false;

  value!: T;

  get disabled(): boolean {
    return this.formControl.disabled || this.isReadonly;
  }

  get touched(): boolean {
    return this.formControl.touched;
  }

  get errors(): ValidationErrors | null {
    return this.touched && !this.disabled ? this.formControl.errors : null;
  }

  get invalid(): boolean {
    return this.formControl.invalid;
  }

  get required(): boolean {
    if (this.formControl.validator) {
      const validator = this.formControl.validator({} as AbstractControl);
      return validator && validator['required'];
    }
    return false;
  }

  get errorStateMatcher(): ErrorStateMatcher {
    const control: FormControl = this.formControl;
    return {
      isErrorState(): boolean {
        return control && control.invalid && control.touched;
      },
    };
  }

  writeValue(newValue: T): void {
    this.value = newValue;
  }

  registerOnChange(fn: (obj: T) => void): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.propagateTouch = fn;
  }

  propagateTouch(): void {}

  protected propagateChange(obj: T): void {}
}
