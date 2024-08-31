import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { eRoutes } from '@shared/enums';

@Component({
  selector: 'info-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink],
})
export class HeaderComponent {
  vehicleListRoute = eRoutes.VEHICLE;
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;
}
