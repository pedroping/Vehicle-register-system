import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { VehiclesFacade } from '@services';
import { eRoutes } from '@shared/enums';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./pages/list-vehicle-page/list-vehicle-page.component'))
        .ListVehiclePageComponent,
    data: { reuse: true, onlySrr: true, keys: ['myData'] },
  },
  {
    path: eRoutes.VEHICLE_EDIT + '/:id',
    loadComponent: async () =>
      (await import('./pages/edit-vehicle-page/edit-vehicle-page.component'))
        .EditVehiclePageComponent,
    resolve: {
      data: (route: ActivatedRouteSnapshot) => {
        return inject(VehiclesFacade).getVehicle(route.params['id'], true);
      },
      viewTransitionName: (route: ActivatedRouteSnapshot) => {
        return `banner-img-${route.params['id']}`;
      },
    },
  },
  {
    path: eRoutes.VEHICLE_NEW,
    loadComponent: async () =>
      (await import('./pages/new-vehicle-page/new-vehicle-page.component')).NewVehiclePageComponent,
    data: { reuse: true },
  },
] as Routes;
