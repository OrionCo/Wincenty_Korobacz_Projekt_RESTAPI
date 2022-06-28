import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { SHARED_COMPS } from './components';

const MATERIAL_ELEMENTS: any[] = [
  MatSnackBarModule,
  MatButtonModule,
  MatInputModule,
  MatRadioModule,
  MatCheckboxModule,
];

@NgModule({
  imports: [CommonModule, ...MATERIAL_ELEMENTS, ReactiveFormsModule],
  declarations: [...SHARED_COMPS],
  exports: [
    ...MATERIAL_ELEMENTS,
    ...SHARED_COMPS,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: '',
    },
  ],
})
export class SharedModule {}
