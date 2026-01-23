import { isPlatformBrowser } from '@angular/common';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

export const errorHandleInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const toastrService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError(() => {
      if (isPlatformBrowser(platformId))
        toastrService.error('Ocorreu um erro. Por favor, tente novamente mais tarde.');

      return EMPTY;
    }),
  );
};
