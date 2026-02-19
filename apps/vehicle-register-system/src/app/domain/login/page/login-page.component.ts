import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthFacadeService, TransferStateService, VehiclesFacade } from '@services';
import { skip, switchMap } from 'rxjs';

@Component({
  selector: 'info-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [RouterLink],
})
export class LoginPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly vehiclesFacade = inject(VehiclesFacade);
  private readonly authFacadeService = inject(AuthFacadeService);
  private readonly transferStateService = inject(TransferStateService);

  constructor() {
    afterNextRender(() => {
      console.info('Secret res: ', this.transferStateService.getKey('VERY_SECRET'));
    });
  }

  ngOnInit() {
    console.info('Secret res: ', this.transferStateService.getKey('VERY_SECRET'));
  }

  login() {
    this.authFacadeService
      .login()
      .pipe(
        switchMap(() => {
          this.vehiclesFacade.setVehicles();
          
          return this.vehiclesFacade.getVehicles$$().pipe(skip(1));
        }),
      )
      .subscribe(() => {
        console.info('Test');
        this.router.navigateByUrl('', { replaceUrl: true });
      });
  }
}
