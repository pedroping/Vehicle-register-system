import { Routes } from '@angular/router';
import { eRoutes } from '@shared/enums';

export default [
  {
    path: '',
    loadComponent: async () => (await import('./page/home-page.component')).HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren: async () => await import('../vehicle/vehicle-routes'),
      },
    ],
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
] as Routes;
