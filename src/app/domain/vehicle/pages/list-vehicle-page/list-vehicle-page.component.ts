import { AsyncPipe, isPlatformBrowser, isPlatformServer } from '@angular/common';
import {
  Component,
  DestroyRef,
  Inject,
  inject,
  makeStateKey,
  OnInit,
  PLATFORM_ID,
  TransferState,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { eRoutes } from '@enums';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { VehiclesFacade } from '@services';
import { fromEvent, map, Observable, startWith } from 'rxjs';
import { ListVehicleHeaderComponent } from '../../components/list-vehicle-header/list-vehicle-header.component';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';

const MY_DATA_KEY = makeStateKey<string>('myData');

@Component({
  selector: 'info-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styleUrls: ['./list-vehicle-page.component.scss'],
  imports: [VehicleComponent, AsyncPipe, RouterLink, FontAwesomeModule, ListVehicleHeaderComponent],
})
export class ListVehiclePageComponent implements OnInit {
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;
  private readonly vehiclesFacade = inject(VehiclesFacade);
  vehicles$ = this.vehiclesFacade.getVehicles$$();

  showText$?: Observable<boolean>;
  _destroyRef = inject(DestroyRef);

  testKey = '';

  constructor(
    library: FaIconLibrary,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private readonly platformId: object,
  ) {
    library.addIcons(faCar);

    const key = MY_DATA_KEY;
    const isServer = isPlatformServer(this.platformId);
    const isBrowser = isPlatformBrowser(this.platformId);

    if (isServer) {
      const envKey = process.env['TEST_KEY'] ?? '';
      this.transferState.set(key, envKey);
      this.testKey = envKey;
      console.info('[SSR] TEST_KEY loaded:', envKey);
      return;
    }

    if (isBrowser) {
      const transferred = this.transferState.get<string>(key, '');
      if (transferred) {
        this.testKey = transferred;
        console.info(`[Browser] TEST_KEY restored from TransferState: ${transferred}`);
      }
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;

    this.showText$ = fromEvent(window, 'scroll').pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(null),
      map(() => {
        return document.documentElement.scrollTop >= 110;
      }),
    );
  }
}
