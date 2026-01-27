import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IVehicleForm } from '@models';

@Injectable({
  providedIn: 'root',
})
export class VehicleFormHandleService {
  private vehicleForm = new FormGroup<IVehicleForm>({
    id: new FormControl<string | number>(
      {
        value: '',
        disabled: true,
      },
      { nonNullable: true },
    ),
    image: new FormControl<string | ArrayBuffer>('', { nonNullable: true }),
    licensePlate: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
    }),
    chassi: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(17), Validators.maxLength(17)],
    }),
    renavam: new FormControl<string | null>(null, {
      validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    }),
    model: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    carBrand: new FormControl<number | null>(null, {
      validators: [Validators.required],
    }),
    year: new FormControl<string>('', {
      nonNullable: true,
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
