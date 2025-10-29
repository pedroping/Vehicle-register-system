import { inject, Injectable } from '@angular/core';
import { VehiclesApiService } from '@core/services/api';
import { INewVehicle, IVehicle } from '@shared/models';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesFacade {
  private readonly vehiclesApiService = inject(VehiclesApiService);
  private vehicles$ = new BehaviorSubject<IVehicle[]>([]);

  setVehicles() {
    this.vehiclesApiService
      .getVehicles()
      .pipe(
        map((vehicles) =>
          vehicles.map((vehicle, i) => ({ ...vehicle, index: i }))
        )
      )
      .subscribe((vehicles) => this.vehicles$.next(vehicles));
  }

  getVehicles$$() {
    if (this.vehicles$.value.length <= 0) {
      this.setVehicles();
    }

    return this.vehicles$.asObservable();
  }

  getVehicle(id: string | number) {
    return this.vehiclesApiService.getVehicle(id);
  }

  deleteVehicle(id: string | number) {
    return this.vehiclesApiService.deleteVehicle(id);
  }

  addVehicle(newVehicle: INewVehicle) {
    return this.vehiclesApiService.addVehicle(newVehicle);
  }

  editVehicle(vehicle: IVehicle) {
    return this.vehiclesApiService.editVehicle(vehicle);
  }

  get vehicles() {
    return this.vehicles$.value;
  }
}
