import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { eRoutes } from '@enums';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'info-list-vehicle-header',
  templateUrl: './list-vehicle-header.component.html',
  styleUrls: ['./list-vehicle-header.component.scss'],
  imports: [RouterLink, FontAwesomeModule],
  host: {
    ngSkipHydration: 'true',
  },
})
export class ListVehicleHeaderComponent {
  newVehicleRoute = `${eRoutes.VEHICLE_NEW}`;

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);
  }
}
