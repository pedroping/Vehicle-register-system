import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsFacade, CategoriesFacade } from '@core/services/facades';
import { eRoutes } from '@shared/enums';
import { IBrand, ICategory, IVehicle } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'info-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  standalone: true,
  imports: [AsyncPipe, UpperCasePipe, RouterLink],
})
export class VehicleComponent implements OnInit {
  private readonly brandsFacade = inject(BrandsFacade);
  private readonly categoriesFacade = inject(CategoriesFacade);

  brand$?: Observable<IBrand | undefined>;
  category$?: Observable<ICategory | undefined>;
  vehicle = input.required<IVehicle>();

  editRoute = computed(() => `${eRoutes.VEHICLE_EDIT}/${this.vehicle().id}`);

  noImage = '/assets/pngs/no-image.png';

  ngOnInit(): void {
    this.brand$ = this.brandsFacade.getBrandById(this.vehicle().carBrand);
    this.category$ = this.categoriesFacade.getCategoryById(
      this.vehicle().category
    );
  }
}
