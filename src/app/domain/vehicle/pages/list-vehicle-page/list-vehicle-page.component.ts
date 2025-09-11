import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { VehiclesFacade } from '@core/services/facades';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { of } from 'rxjs';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';

@Component({
  selector: 'info-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styleUrls: ['./list-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleComponent, AsyncPipe, RouterLink, FontAwesomeModule],
})
export class ListVehiclePageComponent {
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;
  private readonly vehiclesFacade = inject(VehiclesFacade);
  vehicles$ = this.vehiclesFacade.getVehicles$$();

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);
  }
}
