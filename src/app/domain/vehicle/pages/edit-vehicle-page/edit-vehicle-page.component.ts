import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IVehicle } from '@models';
import { DialogHandleService, HasChangesService, VehiclesFacade } from '@services';
import { ToastrService } from 'ngx-toastr';
import { Subject, take, takeUntil } from 'rxjs';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';
import { VehicleFormHandleService } from '../../service/vehicle-form-handle.service';

@Component({
  selector: 'info-edit-vehicle-page',
  templateUrl: './edit-vehicle-page.component.html',
  styleUrls: ['./edit-vehicle-page.component.scss'],
  imports: [VehicleFormComponent, ReactiveFormsModule],
})
export class EditVehiclePageComponent implements OnInit, OnDestroy {
  initialFormValue?: IVehicle;
  vehicleForm = inject(VehicleFormHandleService).form;

  private readonly router = inject(Router);
  private readonly vehiclesFacade = inject(VehiclesFacade);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialogHandleService: DialogHandleService<boolean> = inject(DialogHandleService);
  private readonly hasChangesService = inject(HasChangesService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly destroy$$ = new Subject<void>();

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data['data'] as IVehicle;
    this.vehicleForm.reset();
    this.vehicleForm.patchValue(data, { emitEvent: false });
    const formValue = this.vehicleForm.getRawValue();
    this.initialFormValue = {
      ...formValue,
      renavam: formValue.renavam ?? '',
      carBrand: Number(formValue.carBrand ?? -1),
      category: Number(formValue.category ?? -1),
    };

    this.vehicleForm.valueChanges
      .pipe(take(1), takeUntilDestroyed(this.destroyRef), takeUntil(this.destroy$$))
      .subscribe(() => {
        this.hasChangesService.setChange(this.router.url, true);
      });
  }

  ngOnDestroy(): void {
    this.hasChangesService.setChange(this.router.url, false);
  }

  cancel() {
    this.destroy$$.next();
    this.router.navigate(['./']);
  }

  save() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAsDirty();
      this.vehicleForm.markAllAsTouched();
      this.vehicleForm.updateValueAndValidity();

      this.toastrService.warning('Por favor, preencha todos os campos corretamente.');

      return;
    }

    const hasChange = this.hasChangedAnyValue();

    if (!hasChange) {
      this.toastrService.warning(
        'Nenhum valor alterado, por favor tente alterar algum campo para editar o veículo.',
      );
      return;
    }

    this.editVehicle();
  }

  deleteVehicle() {
    const instance = this.dialogHandleService.openModal<boolean>(() =>
      import('@components').then((c) => c.ConfirmActionComponent),
    );

    instance.close$.subscribe((value) => {
      if (!value) return;

      const id = this.vehicleForm.getRawValue().id;

      this.vehiclesFacade.deleteVehicle(id).subscribe(() => {
        this.vehicleForm.reset();
        this.vehiclesFacade.setVehicles();
        this.router.navigateByUrl('');
        this.toastrService.success('Veículo deletado com sucesso!');
      });
    });
  }

  editVehicle() {
    this.hasChangesService.setChange(this.router.url, false);
    const formValue = this.vehicleForm.getRawValue();
    const newVehicle: IVehicle = {
      id: formValue.id,
      year: formValue.year,
      image: formValue.image,
      model: formValue.model,
      chassi: formValue.chassi,
      renavam: formValue.renavam ?? '',
      licensePlate: formValue.licensePlate,
      carBrand: Number(formValue.carBrand ?? -1),
      category: Number(formValue.category ?? -1),
    };

    this.vehiclesFacade.editVehicle(newVehicle).subscribe(() => {
      this.vehicleForm.reset();
      this.vehiclesFacade.setVehicles();
      this.router.navigateByUrl('');
      this.toastrService.success('Veículo editado com sucesso!');
    });
  }

  hasChangedAnyValue() {
    if (!this.initialFormValue) return false;
    const formValue = this.vehicleForm.getRawValue() as IVehicle;

    return Object.keys(this.initialFormValue).some(
      (key) => this.initialFormValue![key as keyof IVehicle] != formValue[key as keyof IVehicle],
    );
  }

  get modelControl() {
    return this.vehicleForm.controls.model;
  }
}
