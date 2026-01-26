import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { REQUEST } from '../../../../express.tokens';

export const serverCookieInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const expressRequest = inject(REQUEST, { optional: true });

  if (expressRequest) {
    const cookies = expressRequest.headers.cookie;

    if (cookies) {
      const newReq = req.clone({
        withCredentials: true,
        setHeaders: { Cookie: cookies },
      });
      return next(newReq);
    }
  }

  const newReq = req.clone({
    withCredentials: true,
  });

  return next(newReq);
};
