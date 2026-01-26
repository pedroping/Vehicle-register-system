import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { REQUEST } from '@tokens';

export const serverCookieInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const expressRequest = inject(REQUEST, { optional: true });

  if (expressRequest) {
    console.info('[SSR Interceptor] Processing URL:', req.url);
    const cookies = expressRequest.headers.cookie;
    console.info('[SSR Interceptor] Found Cookies:', cookies);

    if (cookies) {
      const newReq = req.clone({
        setHeaders: { Cookie: cookies },
        withCredentials: true,
      });
      return next(newReq);
    }
  } else {
    console.info('[SSR Interceptor] No Express Request token found!');
  }

  const newReq = req.clone({
    withCredentials: true,
  });

  return next(newReq);
};
