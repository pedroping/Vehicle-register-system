import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CustomRouteReuseStrategy } from '@services';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

export const errorHandleInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toastrService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const customRouteReuseStrategy = inject(CustomRouteReuseStrategy, { optional: true });

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        router.navigateByUrl('login', { replaceUrl: true });
        customRouteReuseStrategy?.clearHandlers();
        return EMPTY;
      }

      if (isPlatformBrowser(platformId))
        toastrService.error('Ocorreu um erro. Por favor, tente novamente mais tarde.');

      return EMPTY;
    }),
  );
};
