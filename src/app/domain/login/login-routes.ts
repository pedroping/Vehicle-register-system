import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: async () => (await import('./page/login-page.component')).LoginPageComponent,
    data: { reuse: true, onlySrr: true },
  },
] as Routes;
