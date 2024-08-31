import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';
import { VehicleDataHandleService } from '../../service/vehicle-data-handle.service';

@Component({
  selector: 'info-new-vehicle-page',
  templateUrl: './new-vehicle-page.component.html',
  styleUrls: ['./new-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleFormComponent, ReactiveFormsModule],
})
export class NewVehiclePageComponent {
  vehicleForm = inject(VehicleDataHandleService).form;
}
