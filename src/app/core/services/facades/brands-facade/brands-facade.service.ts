import { inject, Injectable } from '@angular/core';
import { IBrand } from '@shared/models';
import { BehaviorSubject } from 'rxjs';
import { BrandsApiService } from '../../api/brands-api/brands-api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandsFacade {
  private readonly brandsApiService = inject(BrandsApiService);

  private readonly brands$ = new BehaviorSubject<IBrand[]>([]);

  private setBrands() {
    this.brandsApiService.getBrands().subscribe((brands) => this.brands$.next(brands));
  }

  getBrands$$() {
    if (this.brands$.value.length <= 0) {
      this.setBrands();
    }

    return this.brands$.asObservable();
  }

  get brands() {
    return this.brands$.value;
  }

  getBrandById(id: number) {
    return this.brandsApiService.getBrand(id);
  }
}
