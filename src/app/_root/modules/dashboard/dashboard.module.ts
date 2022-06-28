import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/_shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DASHBOARD_DUMBS } from './_dumb-components';
import { DASHBOARD_SMARTS } from './_smart-components';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule, CommonModule],
  declarations: [...DASHBOARD_DUMBS, ...DASHBOARD_SMARTS],
  providers: [],
})
export class DashboardModule {}
