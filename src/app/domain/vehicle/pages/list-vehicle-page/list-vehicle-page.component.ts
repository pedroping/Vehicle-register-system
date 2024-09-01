import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VehiclesFacade } from '@core/services/facades';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { eRoutes } from '@shared/enums';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'info-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styleUrls: ['./list-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleComponent, AsyncPipe, RouterLink],
})
export class ListVehiclePageComponent {
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;
  private readonly vehiclesFacade = inject(VehiclesFacade);
  vehicles$ = this.vehiclesFacade.getVehicles$$();
}
