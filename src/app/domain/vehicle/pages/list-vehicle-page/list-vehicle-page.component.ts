import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { VehiclesFacade } from '@core/services/facades';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';

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
