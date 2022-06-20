import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../_shared/shared.module';
import { ROOT_DUMBS } from './components/_dumb-components';
import { MainMenuComponent } from './components/_dumb-components/main-menu/main-menu.component';
import { ROOT_SMARTS } from './components/_smart-components';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  imports: [CommonModule, RootRoutingModule, SharedModule],
  declarations: [...ROOT_DUMBS, ...ROOT_SMARTS],
  exports: [MainMenuComponent],
})
export class RootModule {}
