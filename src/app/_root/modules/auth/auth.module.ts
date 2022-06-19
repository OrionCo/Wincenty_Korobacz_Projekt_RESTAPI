import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_DUMBS } from './_dumb-components';
import { AUTH_SMARTS } from './_smart-components';

@NgModule({
  imports: [AuthRoutingModule, SharedModule],
  declarations: [...AUTH_DUMBS, ...AUTH_SMARTS],
})
export class AuthModule {}
