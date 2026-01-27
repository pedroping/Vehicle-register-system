import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { errorHandleInterceptor, serverCookieInterceptor } from '@interceptors';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    provideHttpClient(withInterceptors([serverCookieInterceptor, errorHandleInterceptor])),
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
