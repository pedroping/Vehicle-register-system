import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingHandleService } from '@services';
import { finalize } from 'rxjs';

export const loadingHttpInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const loadingHandleService = inject(LoadingHandleService);
  loadingHandleService.enableInterceptor();

  return next(req).pipe(finalize(() => loadingHandleService.disableInterceptor()));
};
