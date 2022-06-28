import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export class AbstractFormComponent {
  formGroup!: FormGroup;

  constructor(protected _fb: FormBuilder) {}

  getControl(path: string): FormControl {
    return <FormControl>this.formGroup.get(path);
  }

  getFormArray(path: string): FormArray {
    return <FormArray>this.formGroup.get(path);
  }
}
