import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingHandleService } from '@core/services/utils';
import { finalize } from 'rxjs';

export const loadingHttpInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const loadingHandleService = inject(LoadingHandleService);
  loadingHandleService.enableInterceptor();

  return next(req).pipe(finalize(() => loadingHandleService.disableInterceptor()));
};
