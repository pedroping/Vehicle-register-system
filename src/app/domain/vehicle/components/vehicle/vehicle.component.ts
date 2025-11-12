import { AsyncPipe, UpperCasePipe } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandsFacade, CategoriesFacade, VehiclesFacade } from '@core/services/facades';
import { DialogHandleService } from '@core/services/utils/dialog-handle/dialog-handle.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { eRoutes } from '@shared/enums';
import { IBrand, ICategory, IVehicle } from '@shared/models';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'info-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
  imports: [AsyncPipe, UpperCasePipe, RouterLink, FontAwesomeModule],
})
export class VehicleComponent implements OnInit, OnChanges {
  private readonly brandsFacade = inject(BrandsFacade);
  private readonly toastrService = inject(ToastrService);
  private readonly vehiclesFacade = inject(VehiclesFacade);
  private readonly categoriesFacade = inject(CategoriesFacade);
  private readonly dialogHandleService: DialogHandleService<boolean> = inject(DialogHandleService);

  brand$?: Observable<IBrand | undefined>;
  category$?: Observable<ICategory | undefined>;
  vehicle = input.required<IVehicle>();

  editRoute = computed(() => `${eRoutes.VEHICLE_EDIT}/${this.vehicle().id}`);

  noImage = '/assets/pngs/no-image.png';

  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faPen);
  }

  ngOnInit(): void {
    this._elementRef.nativeElement.style.setProperty(
      '--index',
      ((this.vehicle().index ?? 0) + 1).toString(),
    );
    this.brand$ = this.brandsFacade.getBrandById(this.vehicle().carBrand);
    this.category$ = this.categoriesFacade.getCategoryById(this.vehicle().category);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const vehicleChange = changes['vehicle'];
    if (!vehicleChange || vehicleChange.firstChange) return;

    if (vehicleChange.previousValue.carBrand != vehicleChange.currentValue.carBrand)
      this.brand$ = this.brandsFacade.getBrandById(this.vehicle().carBrand);

    if (vehicleChange.previousValue.category != vehicleChange.currentValue.category)
      this.category$ = this.categoriesFacade.getCategoryById(this.vehicle().category);
  }

  deleteVehicle() {
    const instance = this.dialogHandleService.openModal<boolean>(() =>
      import('@shared/components').then((c) => c.ConfirmActionComponent),
    );

    instance.close$.subscribe((value) => {
      if (!value) return;

      this.vehiclesFacade.deleteVehicle(this.vehicle().id).subscribe(() => {
        this.vehiclesFacade.setVehicles();
        this.toastrService.success('Veículo deletado com sucesso!');
      });
    });
  }
}
