import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehiclesFacade } from '@core/services/facades';
import { INewVehicle } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';
import { VehicleFormHandleService } from '../../service/vehicle-form-handle.service';

@Component({
  selector: 'info-new-vehicle-page',
  templateUrl: './new-vehicle-page.component.html',
  styleUrls: ['./new-vehicle-page.component.scss'],
  imports: [VehicleFormComponent, ReactiveFormsModule],
})
export class NewVehiclePageComponent implements OnInit {
  vehicleForm = inject(VehicleFormHandleService).form;

  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly vehiclesFacade = inject(VehiclesFacade);

  ngOnInit(): void {
    this.vehicleForm.reset();
  }

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

    this.postVehicle();
  }

  cancel() {
    this.router.navigateByUrl('');
    this.vehicleForm.reset();
  }

  postVehicle() {
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

    this.vehiclesFacade.addVehicle(newVehicle).subscribe(() => {
      this.vehicleForm.reset();
      this.vehiclesFacade.setVehicles();
      this.router.navigateByUrl('');
      this.toastrService.success('Veículo adicionado com sucesso!');
    });
  }
}
