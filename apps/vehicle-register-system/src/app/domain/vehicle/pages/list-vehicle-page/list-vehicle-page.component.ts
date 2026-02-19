import { AsyncPipe, isPlatformServer } from '@angular/common';
import { Component, DestroyRef, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { eRoutes } from '@enums';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { TransferStateService, VehiclesFacade } from '@services';
import { fromEvent, map, Observable, startWith } from 'rxjs';
import { ListVehicleHeaderComponent } from '../../components/list-vehicle-header/list-vehicle-header.component';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';

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
    @Inject(PLATFORM_ID) private readonly platformId: object,
    private readonly transferStateService: TransferStateService,
  ) {
    library.addIcons(faCar);

    const isServer = isPlatformServer(this.platformId);

    if (isServer) {
      const keyValue = this.transferStateService.getKey('myData');
      console.info('[SSR] KEY loaded:', keyValue);
      return;
    }

    const keyValue = this.transferStateService.getKey('myData');

    if (!keyValue) {
      console.info(`[Browser] KEY not found`);

      return;
    }

    console.info(`[Browser] KEY restored from TransferState: ${keyValue}`);
    this.testKey = keyValue;
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
