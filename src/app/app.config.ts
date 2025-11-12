import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  RouteReuseStrategy,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { errorHandleInterceptor, loadingHttpInterceptorFn } from '@core/interceptors';
import { loadingSpinnerProvider } from '@core/providers/loading-spinner-provider';
import { CustomRouteReuseStrategy } from '@core/services/utils/custom-route-reuse-strategy/custom-route-reuse-strategy.service';
import { environment } from '@environment/environment';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

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
    loadingSpinnerProvider(),
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
      withEnabledBlockingInitialNavigation(),
    ),
    provideToastr({ maxOpened: 1, autoDismiss: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorHandleInterceptor, loadingHttpInterceptorFn]),
      withFetch(),
    ),
    IMAGE_PROVIDER,
    ENVIRONMENT_PROVIDER,
    provideClientHydration(),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
};
