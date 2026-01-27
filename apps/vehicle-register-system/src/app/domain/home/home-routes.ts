import { Routes } from '@angular/router';

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
] as Routes;
