import { AsyncPipe, isPlatformServer } from '@angular/common';
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
import { VehiclesFacade } from '@core/services/facades';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { fromEvent, map, Observable, startWith } from 'rxjs';
import { ListVehicleHeaderComponent } from '../../components/list-vehicle-header/list-vehicle-header.component';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';

const MY_DATA_KEY = makeStateKey<string>('myData');

@Component({
  selector: 'info-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styleUrls: ['./list-vehicle-page.component.scss'],
  imports: [
    VehicleComponent,
    AsyncPipe,
    RouterLink,
    FontAwesomeModule,
    ListVehicleHeaderComponent,
  ],
})
export class ListVehiclePageComponent implements OnInit {
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;
  private readonly vehiclesFacade = inject(VehiclesFacade);
  vehicles$ = this.vehiclesFacade.getVehicles$$();

  showText$?: Observable<boolean>;
  _destroyRef = inject(DestroyRef);

  a = '';

  constructor(
    library: FaIconLibrary,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    library.addIcons(faCar);

    if (isPlatformServer(this.platformId)) {
      console.log(process.env['TEST_KEY']);
      this.a = process.env['TEST_KEY'] ?? '';
      this.transferState.set(MY_DATA_KEY, this.a);
    } else {
      const clientData = this.transferState.get(MY_DATA_KEY, null);
      console.log(clientData);

      if (!clientData) {
        window.location.reload();
        return;
      }
      this.a = clientData ?? '';
    }
  }

  ngOnInit(): void {
    if (isPlatformServer(this.platformId)) return;

    this.showText$ = fromEvent(window, 'scroll').pipe(
      takeUntilDestroyed(this._destroyRef),
      startWith(null),
      map(() => {
        return document.documentElement.scrollTop >= 110;
      })
    );
  }
}
