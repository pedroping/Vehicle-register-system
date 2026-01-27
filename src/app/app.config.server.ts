import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withAppShell, withRoutes } from '@angular/ssr';
import { errorHandleInterceptor, serverCookieInterceptor } from '@interceptors';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(
      withRoutes(serverRoutes),
      withAppShell(() => import('./app.component').then((m) => m.AppComponent)),
    ),
    provideHttpClient(withInterceptors([serverCookieInterceptor, errorHandleInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
