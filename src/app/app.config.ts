import { IMAGE_CONFIG, isPlatformServer } from '@angular/common';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  makeStateKey,
  PLATFORM_ID,
  provideAppInitializer,
  Provider,
  provideZoneChangeDetection,
  TransferState,
} from '@angular/core';
import { provideClientHydration, withIncrementalHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  RouteReuseStrategy,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { environment } from '@environment';
import { errorHandleInterceptor, loadingHttpInterceptorFn } from '@interceptors';
import { loadingSpinnerProvider } from '@providers';
import { CustomRouteReuseStrategy, HasChangesService } from '@services';
import { ENVIRONMENT_TOKEN } from '@tokens';
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
      }),
    ),
    provideToastr({ maxOpened: 1, autoDismiss: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([errorHandleInterceptor, loadingHttpInterceptorFn]),
      withFetch(),
    ),
    IMAGE_PROVIDER,
    ENVIRONMENT_PROVIDER,
    provideClientHydration(withIncrementalHydration()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAppInitializer(() => {
      const hasChangesService = inject(HasChangesService);
      const transferState = inject(TransferState);
      const platformId = inject(PLATFORM_ID);

      if (isPlatformServer(platformId))
        transferState.set(makeStateKey<string>('myData'), process.env['TEST_KEY']);

      return hasChangesService.startDomain();
    }),
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
};
