import { Component, afterNextRender, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from '@core/ui/loading-spinner';

@Component({
  selector: 'info-root',
  imports: [RouterOutlet, LoadingSpinnerComponent],
  template: `
    <router-outlet />
    <info-loading-spinner data-testid="info-loading-spinner-template" />
  `,
})
export class AppComponent {
  private readonly meta = inject(Meta);

  constructor() {
    afterNextRender(() => {
      this.loadStyles();
      this.meta.updateTag({
        name: 'description',
        content:
          'An Angular-powered car rental system featuring a sleek UI, real-time vehicle availability, and a seamless booking process. Built with modern web technologies.',
      });
    });
  }

  private loadStyles() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = 'toastr.css';
    document.head.appendChild(style);
  }
}
