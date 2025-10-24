import { AsyncPipe, isPlatformServer } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { fromEvent, map, Observable, startWith } from 'rxjs';
@Component({
  selector: 'info-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, FontAwesomeModule, AsyncPipe],
})
export class HeaderComponent implements OnInit {
  vehicleListRoute = eRoutes.VEHICLE;
  newVehicleRoute = `${eRoutes.VEHICLE_NEW}`;

  _router?: Router;
  _destroyRef?: DestroyRef;

  onHome = false;
  showText$?: Observable<boolean>;

  constructor(
    library: FaIconLibrary,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    library.addIcons(faCar);

    if (!isPlatformServer(this.platformId)) {
      this._router = inject(Router);
      this._destroyRef = inject(DestroyRef);
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;

    this.onHome = this._router?.url == '/';

    this.showText$ = fromEvent(window, 'scroll').pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(null),
      map(() => {
        return document.documentElement.scrollTop >= 110;
      })
    );
  }
}
