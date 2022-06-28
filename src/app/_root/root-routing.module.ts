import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_core/guards/auth.guard';
import { LoggedInGuard } from '../_core/guards/logged-in.guard';
import { NotFoundComponent } from './components/_dumb-components/not-found/not-found.component';
import { ContainerComponent } from './components/_dumb-components/container/container.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LoggedInGuard],
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'tests',
        loadChildren: () =>
          import('./modules/tests/tests.module').then((m) => m.TestsModule),
      },
      {
        path: 'not-found',
        pathMatch: 'full',
        component: NotFoundComponent,
      },
      {
        path: '**',
        redirectTo: 'not-found',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
