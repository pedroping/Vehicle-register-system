import { RenderMode, ServerRoute } from '@angular/ssr';
import { eRoutes } from '@shared/enums';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: eRoutes.VEHICLE_NEW,
    renderMode: RenderMode.Prerender,
  },
  {
    path: eRoutes.VEHICLE_EDIT + '/:id',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
