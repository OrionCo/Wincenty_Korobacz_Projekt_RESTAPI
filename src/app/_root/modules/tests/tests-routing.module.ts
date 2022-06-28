import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFormComponent } from './_smart-components/test-form/test-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class TestsRoutingModule {}
