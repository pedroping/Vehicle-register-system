import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { Component, computed, inject, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  BrandsFacade,
  CategoriesFacade,
  VehiclesFacade,
} from '@core/services/facades';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { ConfirmActionComponent } from '@shared/components';
import { eRoutes } from '@shared/enums';
import { IBrand, ICategory, IVehicle } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
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
  private readonly toastrService = inject(ToastrService);
  private readonly vehiclesFacade = inject(VehiclesFacade);
  private readonly categoriesFacade = inject(CategoriesFacade);
  private readonly dialogHandleService: DialogHandleService<boolean> =
    inject(DialogHandleService);

  brand$?: Observable<IBrand | undefined>;
  category$?: Observable<ICategory | undefined>;
  vehicle = input.required<IVehicle>();

  editRoute = computed(() => `${eRoutes.VEHICLE_EDIT}/${this.vehicle().id}`);

  noImage = '/assets/pngs/no-image.png';

  ngOnInit(): void {
    this.brand$ = this.brandsFacade.getBrandById(this.vehicle().carBrand);
    this.category$ = this.categoriesFacade.getCategoryById(
      this.vehicle().category,
    );
  }

  deleteVehicle() {
    const instance = this.dialogHandleService.openModal(ConfirmActionComponent);

    // instance.event.subscribe((value) => {
    //   if (!value) return;

    //   this.vehiclesFacade.deleteVehicle(this.vehicle().id).subscribe(() => {
    //     this.vehiclesFacade.setVehicles();
    //     this.toastrService.success('Veículo deletado com sucesso!');
    //   });
    // });
  }
}
