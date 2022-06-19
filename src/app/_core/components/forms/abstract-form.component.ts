import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export class AbstractFormComponent {
  formGroup!: FormGroup;

  constructor(protected _fb: FormBuilder) {}

  getControl(path: string): FormControl {
    return <FormControl>this.formGroup.get(path);
  }
}
