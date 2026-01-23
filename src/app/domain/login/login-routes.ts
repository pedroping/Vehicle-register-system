import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Routes } from '@angular/router';
import { eRoutes } from '@enums';
import { AuthFacadeService, TransferStateService } from '@services';
import { catchError, of, tap } from 'rxjs';

export default [
  {
    path: '',
    loadComponent: async () => (await import('./page/login-page.component')).LoginPageComponent,
    data: { reuse: true },
    resolve: {
      getSecret: () => {
        const platformId = inject(PLATFORM_ID);
        const authFacadeService = inject(AuthFacadeService);
        const transferStateService = inject(TransferStateService);

        if (transferStateService.getKey('VERY_SECRET')) {
          return {};
        }

        if (isPlatformBrowser(platformId)) {
          window.transitionEnd = () => {
            window.location.href = eRoutes.LOGIN;
          };
          return {};
        }

        return authFacadeService.getSecret().pipe(
          tap((res) => {
            transferStateService.setKey('VERY_SECRET', (res as { message: string }).message);
          }),
          catchError((err) => {
            console.info(err);

            return of({});
          }),
        );
      },
    },
  },
] as Routes;
