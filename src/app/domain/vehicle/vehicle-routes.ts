import { Routes } from '@angular/router';
import { eRoutes } from '@shared/enums';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./pages/list-vehicle-page/list-vehicle-page.component'))
        .ListVehiclePageComponent,
    data: { reuse: true },
  },
  {
    path: eRoutes.VEHICLE_EDIT + '/:id',
    loadComponent: async () =>
      (await import('./pages/edit-vehicle-page/edit-vehicle-page.component'))
        .EditVehiclePageComponent,
  },
  {
    path: eRoutes.VEHICLE_NEW,
    loadComponent: async () =>
      (await import('./pages/new-vehicle-page/new-vehicle-page.component'))
        .NewVehiclePageComponent,
    data: { reuse: true },
  },
] as Routes;
