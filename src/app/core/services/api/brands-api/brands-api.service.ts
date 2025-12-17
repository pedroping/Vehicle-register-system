import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBrand } from '@models';
import { ENVIRONMENT_TOKEN } from '@tokens';


@Injectable({
  providedIn: 'root',
})
export class BrandsApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  private readonly BRANDS = 'brands';

  getBrands() {
    return this.http.get<IBrand[]>(`${this.environment}/${this.BRANDS}`);
  }

  getBrand(id: number | string) {
    return this.http.get<IBrand>(`${this.environment}/${this.BRANDS}/${id}`);
  }
}
