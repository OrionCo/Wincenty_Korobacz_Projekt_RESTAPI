import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTestFormComponent } from './_smart-components/new-test-form/new-test-form.component';
import { TestFormComponent } from './_smart-components/test-form/test-form.component';
import { TestListComponent } from './_smart-components/test-list/test-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestListComponent,
  },
  {
    path: 'new',
    pathMatch: 'full',
    component: NewTestFormComponent,
  },
  {
    path: 'edit/:category',
    pathMatch: 'prefix',
    component: NewTestFormComponent,
  },
  {
    path: ':category',
    pathMatch: 'prefix',
    component: TestFormComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: TestListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class TestsRoutingModule {}
