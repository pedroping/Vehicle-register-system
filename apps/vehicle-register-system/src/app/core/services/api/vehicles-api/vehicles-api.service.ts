import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { eHeaders } from '@enums';
import { INewVehicle, IVehicle } from '@models';
import { ENVIRONMENT_TOKEN } from '@tokens';

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
    const headers = new HttpHeaders().set(eHeaders.HIDE_LOADING, '1');

    return this.http.get<IVehicle>(`${this.environment}/${this.VEHICLES}/${id}`, {
      headers,
    });
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
