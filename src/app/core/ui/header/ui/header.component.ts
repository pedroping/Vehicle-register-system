import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { filter, fromEvent, startWith, switchMap } from 'rxjs';
@Component({
  selector: 'info-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, FontAwesomeModule],
})
export class HeaderComponent {
  vehicleListRoute = eRoutes.VEHICLE;
  newVehicleRoute = `${eRoutes.VEHICLE_NEW}`;

  private readonly header =
    viewChild.required<ElementRef<HTMLElement>>('header');
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);

    afterNextRender(() => {
      this.scrollListener();
    });
  }

  private scrollListener() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        switchMap(() => fromEvent(window, 'scroll').pipe(startWith(null))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        const isAtHome = this.router.url === '/';
        const higherThanHeader =
          window.document.documentElement.scrollTop > 150;

        this.header().nativeElement.style.transform =
          higherThanHeader || !isAtHome
            ? 'translateY(0px)'
            : 'translateY(-60px)';
      });
  }
}
