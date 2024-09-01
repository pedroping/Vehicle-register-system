import { inject, Injectable } from '@angular/core';
import { VehiclesApiService } from '@core/services/api';
import { IVehicle } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehiclesFacade {
  private readonly vehiclesApiService = inject(VehiclesApiService);
  private vehicles$ = new BehaviorSubject<IVehicle[]>([]);

  setVehicles() {
    this.vehiclesApiService
      .getVehicles()
      .subscribe((vehicles) => this.vehicles$.next(vehicles));
  }

  getVehicles$$() {
    if (this.vehicles$.value.length <= 0) {
      this.setVehicles();
    }

    return this.vehicles$.asObservable();
  }

  get vehicles() {
    return this.vehicles$.value;
  }
}