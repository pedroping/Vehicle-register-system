import { isPlatformServer } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { debounceTime, fromEvent, tap } from 'rxjs';
@Component({
  selector: 'info-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, FontAwesomeModule],
})
export class HeaderComponent {
  vehicleListRoute = eRoutes.VEHICLE;
  newVehicleRoute = `${eRoutes.VEHICLE_NEW}`;

  constructor(library: FaIconLibrary) {
    library.addIcons(faCar);
  }
}
