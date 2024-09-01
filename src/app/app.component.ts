import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from '@core/ui/dialog';
import { LoadingSpinnerComponent } from '@core/ui/loading-spinner';

@Component({
  selector: 'info-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent, DialogComponent],
  template: `
    <info-dialog />
    <router-outlet />
    <info-loading-spinner />
  `,
})
export class AppComponent {
  title = 'Processo-Seletivo-Info-FrontEnd';
}
