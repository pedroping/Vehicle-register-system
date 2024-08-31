import { FormControl } from '@angular/forms';

export interface IVehicleForm {
  id: FormControl<string | number>;
  image: FormControl<string | ArrayBuffer>;
  licensePlate: FormControl<string>;
  chassi: FormControl<string>;
  renavam: FormControl<string | null>;
  model: FormControl<string>;
  carBrand: FormControl<number | null>;
  year: FormControl<string>;
  category: FormControl<number | null>;
}
