import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from '@core/ui/dialog';
import { LoadingSpinnerComponent } from '@core/ui/loading-spinner';

@Component({
  selector: 'info-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent, DialogComponent],
  template: `
    <info-dialog data-testid="info-dialog-template" />
    <router-outlet />
    <info-loading-spinner data-testid="info-loading-spinner-template" />
  `,
})
export class AppComponent {}
