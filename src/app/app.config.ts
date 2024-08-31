import {
  ApplicationConfig,
  Provider,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { environment } from '@environment/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

const ENVIRONMENT_PROVIDER: Provider = {
  provide: ENVIRONMENT_TOKEN,
  useValue: environment.API,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(routes, withViewTransitions()),
    provideToastr({ maxOpened: 1, autoDismiss: true }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    ENVIRONMENT_PROVIDER,
  ],
};
