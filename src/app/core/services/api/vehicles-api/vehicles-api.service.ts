import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { INewVehicle, IVehicle } from '@shared/models';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  private readonly VEHICLES = 'vehicles';

  getVehicles() {
    return this.http.get<IVehicle[]>(`${this.environment}/${this.VEHICLES}`);
  }

  getVehicle(id: string | number) {
    return this.http.get<IVehicle>(`${this.environment}/${this.VEHICLES}/${id}`);
  }

  deleteVehicle(id: string | number) {
    return this.http.delete<IVehicle>(`${this.environment}/${this.VEHICLES}/${id}`);
  }

  addVehicle(newVehicle: INewVehicle) {
    return this.http.post<IVehicle>(`${this.environment}/${this.VEHICLES}`, newVehicle);
  }

  editVehicle(vehicle: IVehicle) {
    return this.http.put<IVehicle>(`${this.environment}/${this.VEHICLES}/${vehicle.id}`, vehicle);
  }
}
