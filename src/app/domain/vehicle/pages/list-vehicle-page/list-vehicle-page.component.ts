import { Component, inject } from '@angular/core';
import { VehiclesFacade } from '@core/services/facades/vehicles-facade/vehicles-facade.service';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'info-list-vehicle-page',
  templateUrl: './list-vehicle-page.component.html',
  styleUrls: ['./list-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleComponent, AsyncPipe],
})
export class ListVehiclePageComponent {
  private readonly vehiclesFacade = inject(VehiclesFacade);
  vehicles$ = this.vehiclesFacade.getVehicles$$();
}
