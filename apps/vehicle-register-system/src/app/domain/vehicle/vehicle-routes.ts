import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { eRoutes } from '@enums';
import { authGuard, canDeactivateGuard } from '@guards';
import { VehiclesFacade } from '@services';

export default [
  {
    path: '',
    loadComponent: async () =>
      (await import('./pages/list-vehicle-page/list-vehicle-page.component'))
        .ListVehiclePageComponent,
    data: { reuse: true, keys: ['myData'] },
    canActivate: [authGuard],
  },
  {
    path: eRoutes.VEHICLE_EDIT + '/:id',
    loadComponent: async () =>
      (await import('./pages/edit-vehicle-page/edit-vehicle-page.component'))
        .EditVehiclePageComponent,
    resolve: {
      data: (route: ActivatedRouteSnapshot) => {
        return inject(VehiclesFacade).getVehicle(route.params['id']);
      },
      viewTransitionName: (route: ActivatedRouteSnapshot) => {
        return `banner-img-${route.params['id']}`;
      },
    },
    canDeactivate: [canDeactivateGuard],
    canActivate: [authGuard],
  },
  {
    path: eRoutes.VEHICLE_NEW,
    loadComponent: async () =>
      (await import('./pages/new-vehicle-page/new-vehicle-page.component')).NewVehiclePageComponent,
    data: { reuse: true },
    canDeactivate: [canDeactivateGuard],
    canActivate: [authGuard],
  },
] as Routes;
