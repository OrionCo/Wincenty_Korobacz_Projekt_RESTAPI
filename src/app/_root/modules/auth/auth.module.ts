import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_DUMBS } from './_dumb-components';
import { AUTH_SMARTS } from './_smart-components';

@NgModule({
  imports: [AuthRoutingModule],
  declarations: [...AUTH_DUMBS, ...AUTH_SMARTS],
})
export class AuthModule {}
