import { FormControl } from '@angular/forms';

export interface IVehicleForm {
  id: FormControl<number | null>;
  image: FormControl<string | ArrayBuffer>;
  licensePlate: FormControl<string>;
  chassi: FormControl<string>;
  renavam: FormControl<number | null>;
  model: FormControl<string>;
  carBrand: FormControl<number | null>;
  year: FormControl<number | null>;
  category: FormControl<number | null>;
}
