import { Routes } from '@angular/router';
import { eRoutes } from '@shared/enums';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./page/home-page.component')).HomePageComponent,
    children: [
      {
        path: '',
        redirectTo: eRoutes.VEHICLE,
        pathMatch: 'full',
      },
      {
        path: eRoutes.VEHICLE,
        loadChildren: async () => await import('../vehicle/vehicle-routes'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: eRoutes.VEHICLE,
    pathMatch: 'full',
  },
] as Routes;
