import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_DUMBS } from './_dumb-components';
import { AUTH_SMARTS } from './_smart-components';

@NgModule({
  imports: [AuthRoutingModule, SharedModule, RouterModule],
  declarations: [...AUTH_DUMBS, ...AUTH_SMARTS],
})
export class AuthModule {}
