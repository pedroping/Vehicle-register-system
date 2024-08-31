import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  errorHandleInterceptor,
  loadingHttpInterceptorFn,
} from '@core/interceptors';
import { environment } from '@environment/environment';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

const ENVIRONMENT_PROVIDER: Provider = {
  provide: ENVIRONMENT_TOKEN,
  useValue: environment.API,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
    provideToastr({ maxOpened: 1, autoDismiss: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorHandleInterceptor, loadingHttpInterceptorFn])
    ),
    ENVIRONMENT_PROVIDER,
  ],
};
