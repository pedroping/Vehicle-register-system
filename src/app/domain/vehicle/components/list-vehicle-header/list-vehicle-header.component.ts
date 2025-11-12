import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';

@Component({
  selector: 'info-list-vehicle-header',
  templateUrl: './list-vehicle-header.component.html',
  styleUrls: ['./list-vehicle-header.component.scss'],
  imports: [RouterLink, FontAwesomeModule],
})
export class ListVehicleHeaderComponent {
  newVehicleRoute = `${eRoutes.VEHICLE_NEW}`;

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);
  }
}
