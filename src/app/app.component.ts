import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingSpinnerComponent } from '@core/ui/loading-spinner';

const styles = ['fontawesome.css', 'toastr.css'];

@Component({
  selector: 'info-root',
  standalone: true,
  imports: [RouterOutlet, LoadingSpinnerComponent],
  template: `
    <router-outlet />
    <info-loading-spinner data-testid="info-loading-spinner-template" />
  `,
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.loadStyles();
  }

  private loadStyles() {
    const appenStyle = (name: string) => {
      let style = document.createElement('link');
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = name;
      document.head.appendChild(style);
    };
    styles.forEach((style) => appenStyle(style));
  }
}
