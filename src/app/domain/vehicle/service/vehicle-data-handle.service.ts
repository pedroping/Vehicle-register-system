import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVehicleForm } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class VehicleDataHandleService {
  private vehicleForm = new FormGroup<IVehicleForm>({
    id: new FormControl<number | null>(null),
    image: new FormControl<string | ArrayBuffer>('', { nonNullable: true }),
    licensePlate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(7)],
    }),
    chassi: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(17)],
    }),
    renavam: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.minLength(11)],
    }),
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    carBrand: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    year: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    category: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
  });

  get form() {
    return this.vehicleForm;
  }
}
