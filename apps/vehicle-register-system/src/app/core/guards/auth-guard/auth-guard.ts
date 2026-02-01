import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { catchError, defaultIfEmpty, map, Observable, of, take } from 'rxjs';
import { AuthFacadeService } from '../../services';
import { eRoutes } from '@enums';

export const authGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const authFacadeService = inject(AuthFacadeService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) return of(true);

  return authFacadeService.checkSession().pipe(
    take(1),
    defaultIfEmpty(false),
    catchError((e) => {
      console.error('Auth Guard Error:', e);
      return of(false);
    }),
    map((isAuthenticated) => {
      console.info('Auth guard', isAuthenticated);

      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree([`${eRoutes.LOGIN}`]);
      }
    }),
  );
};
