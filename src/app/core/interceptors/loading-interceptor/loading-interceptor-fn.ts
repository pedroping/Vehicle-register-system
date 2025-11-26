import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingHandleService } from '@services';
import { eHeaders } from '@shared/enums';
import { finalize } from 'rxjs';

export const loadingHttpInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const loadingHandleService = inject(LoadingHandleService);

  const hideLoadingHeader = req.headers.get(eHeaders.HIDE_LOADING);

  if (hideLoadingHeader != '1') loadingHandleService.enableInterceptor();

  return next(req).pipe(finalize(() => loadingHandleService.disableInterceptor()));
};
