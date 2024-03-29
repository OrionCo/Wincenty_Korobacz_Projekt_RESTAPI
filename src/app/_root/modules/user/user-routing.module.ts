import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsComponent } from './_smart-components/results/results.component';

const routes: Routes = [
  {
    path: 'results',
    pathMatch: 'full',
    component: ResultsComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'results',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [RouterModule],
})
export class UserRoutingModule {}
