import { Routes } from '@angular/router';
import { eRoutes } from '@enums';

export const routes: Routes = [
  {
    path: '',
    loadChildren: async () => await import('./domain/home/home-routes'),
  },
  {
    path: eRoutes.LOGIN,
    loadChildren: async () => await import('./domain/login/login-routes'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
