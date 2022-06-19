import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ROOT_DUMBS } from './components/_dumb-components';
import { ROOT_SMARTS } from './components/_smart-components';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  imports: [CommonModule, RootRoutingModule],
  declarations: [...ROOT_DUMBS, ...ROOT_SMARTS],
})
export class RootModule {}
