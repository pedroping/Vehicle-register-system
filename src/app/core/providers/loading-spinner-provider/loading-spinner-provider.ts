import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  provideAppInitializer
} from '@angular/core';
import { LoadingHandleService } from '@services';
import { LoadingSpinnerComponent } from '@ui';

export const loadingSpinnerProvider = () => {
  return [
    LoadingHandleService,
    provideAppInitializer(() => {
      const _applicationRef = inject(ApplicationRef);
      const _environmentInjector = inject(EnvironmentInjector);
      const _document = inject(DOCUMENT, { optional: true });

      const loadingSpinnerRef = createComponent(LoadingSpinnerComponent, {
        environmentInjector: _environmentInjector,
      });

      afterNextRender(() => {
        _applicationRef.attachView(loadingSpinnerRef.hostView);
        _document?.body.appendChild(loadingSpinnerRef.location.nativeElement);
      });
    }),
  ];
};
