import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY } from 'rxjs';

export const errorHandleInterceptor = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
) => {
  const toastrService = inject(ToastrService);

  return next(req).pipe(
    catchError(() => {
      toastrService.error(
        'Ocorreu um erro. Por favor, tente novamente mais tarde.'
      );

      return EMPTY;
    })
  );
};
