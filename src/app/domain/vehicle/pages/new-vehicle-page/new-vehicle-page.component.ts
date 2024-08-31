import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VehiclesApiService } from '@core/services/api';
import { INewVehicle } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';
import { VehicleDataHandleService } from '../../service/vehicle-data-handle.service';
import { eRoutes } from '@shared/enums';
import { Router } from '@angular/router';

@Component({
  selector: 'info-new-vehicle-page',
  templateUrl: './new-vehicle-page.component.html',
  styleUrls: ['./new-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleFormComponent, ReactiveFormsModule],
})
export class NewVehiclePageComponent {
  vehicleListRoute = eRoutes.VEHICLE;

  router = inject(Router);
  toastrService = inject(ToastrService);
  vehiclesApiService = inject(VehiclesApiService);
  vehicleForm = inject(VehicleDataHandleService).form;

  save() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAsDirty();
      this.vehicleForm.markAllAsTouched();
      this.vehicleForm.updateValueAndValidity();

      this.toastrService.warning(
        'Por favor, preencha todos os campos corretamente.'
      );

      return;
    }

    const formValue = this.vehicleForm.getRawValue();

    const newVehicle: INewVehicle = {
      year: formValue.year,
      image: formValue.image,
      model: formValue.model,
      chassi: formValue.chassi,
      renavam: formValue.renavam ?? '',
      licensePlate: formValue.licensePlate,
      carBrand: Number(formValue.carBrand ?? -1),
      category: Number(formValue.category ?? -1),
    };

    this.postVehicle(newVehicle);
  }

  cancel() {
    this.vehicleForm.reset();
    this.router.navigateByUrl(this.vehicleListRoute, { replaceUrl: true });
  }

  postVehicle(newVehicle: INewVehicle) {
    this.vehiclesApiService.addVehicle(newVehicle).subscribe(() => {
      this.vehicleForm.reset();
      this.router.navigateByUrl(this.vehicleListRoute, { replaceUrl: true });
      this.toastrService.success('Veículo adicionado com sucesso!');
    });
  }
}
