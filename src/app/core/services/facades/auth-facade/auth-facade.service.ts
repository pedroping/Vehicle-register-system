import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN } from '@tokens';
import { TransferStateService } from '../../utils/transfer-state/transfer-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  token = 'test-token';
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);
  private readonly VEHICLES = 'vehicles';

  constructor(private readonly transferStateService: TransferStateService) {}

  getSecret() {
    return this.http.get(
      `${this.environment}/${this.VEHICLES}/secret/${process?.env?.['VERY_SECRET']}`,
    );
  }
}
