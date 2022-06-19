import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AbstractControlComponent } from 'src/app/_core/components/forms/abstract-control.component';

@Component({
  selector: 'app-control-input',
  styleUrls: ['./control-input.component.scss'],
  templateUrl: './control-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlInputComponent),
      multi: true,
    },
  ],
})
export class ControlInputComponent extends AbstractControlComponent<
  string | number
> {}
