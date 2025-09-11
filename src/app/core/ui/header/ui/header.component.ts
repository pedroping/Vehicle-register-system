import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { eRoutes } from '@shared/enums';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'info-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
})
export class HeaderComponent {
  vehicleListRoute = eRoutes.VEHICLE;
  newVehicleRoute = `${eRoutes.VEHICLE}/${eRoutes.VEHICLE_NEW}`;

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);
  }
}
