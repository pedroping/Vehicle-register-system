import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { IMAGE_CONFIG } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  errorHandleInterceptor,
  loadingHttpInterceptorFn,
} from '@core/interceptors';
import { environment } from '@environment/environment';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const ENVIRONMENT_PROVIDER: Provider = {
  provide: ENVIRONMENT_TOKEN,
  useValue: environment.API,
};

const IMAGE_PROVIDER: Provider = {
  provide: IMAGE_CONFIG,
  useValue: {
    disableImageSizeWarning: true,
    disableImageLazyLoadWarning: true,
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
    provideToastr({ maxOpened: 1, autoDismiss: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorHandleInterceptor, loadingHttpInterceptorFn]),
      withFetch()
    ),
    IMAGE_PROVIDER,
    ENVIRONMENT_PROVIDER,
    provideClientHydration(),
  ],
};
