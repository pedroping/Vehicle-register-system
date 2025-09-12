import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { BrandsFacade, CategoriesFacade } from '@core/services/facades';
import { FormErrorDirective } from '@shared/directives';
import { ImageFieldComponent } from '../image-field/image-field.component';

@Component({
    selector: 'info-vehicle-form',
    templateUrl: './vehicle-form.component.html',
    styleUrls: ['./vehicle-form.component.scss'],
    imports: [
        AsyncPipe,
        FormErrorDirective,
        ReactiveFormsModule,
        ImageFieldComponent,
    ],
    viewProviders: [
        {
            provide: ControlContainer,
            useExisting: FormGroupDirective,
        },
    ]
})
export class VehicleFormComponent {
  brands$ = inject(BrandsFacade).getBrands$$();
  categories$ = inject(CategoriesFacade).getCategories$$();
}
