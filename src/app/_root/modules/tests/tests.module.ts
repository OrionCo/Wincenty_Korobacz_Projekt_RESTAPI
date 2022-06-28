import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TestsRoutingModule } from './tests-routing.module';
import { TESTS_DUMBS } from './_dumb-components';
import { TEST_SMARTS } from './_smart-components';

@NgModule({
  imports: [SharedModule, TestsRoutingModule, RouterModule],
  declarations: [...TEST_SMARTS, ...TESTS_DUMBS],
})
export class TestsModule {}
