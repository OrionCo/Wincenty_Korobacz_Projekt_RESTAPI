import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { USER_DUMBS } from './_dumb-components';
import { USER_SMARTS } from './_smart-components';

@NgModule({
  imports: [UserRoutingModule, SharedModule],
  declarations: [...USER_DUMBS, ...USER_SMARTS],
})
export class UserModule {}
