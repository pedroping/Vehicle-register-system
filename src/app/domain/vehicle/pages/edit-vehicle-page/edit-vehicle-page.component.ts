import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesApiService } from '@core/services/api';
import { switchMap, take } from 'rxjs';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';
import { VehicleFormHandleService } from '../../service/vehicle-form-handle.service';
import { ReactiveFormsModule } from '@angular/forms';
import { eRoutes } from '@shared/enums';

@Component({
  selector: 'info-edit-vehicle-page',
  templateUrl: './edit-vehicle-page.component.html',
  styleUrls: ['./edit-vehicle-page.component.scss'],
  standalone: true,
  imports: [VehicleFormComponent, ReactiveFormsModule],
})
export class EditVehiclePageComponent implements OnInit {
  vehicleListRoute = eRoutes.VEHICLE;
  vehicleForm = inject(VehicleFormHandleService).form;

  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly vehiclesApiService = inject(VehiclesApiService);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        take(1),
        switchMap((params) => this.vehiclesApiService.getVehicle(params['id']))
      )
      .subscribe((vehicle) => this.vehicleForm.patchValue(vehicle));
  }

  cancel() {
    this.router.navigateByUrl(this.vehicleListRoute, { replaceUrl: true });
    this.vehicleForm.reset();
  }

  save() {}
}
