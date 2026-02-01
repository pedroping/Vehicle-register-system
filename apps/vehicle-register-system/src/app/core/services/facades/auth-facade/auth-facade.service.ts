import { inject, Injectable } from '@angular/core';
import { AuthApiService } from '../../api/auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  private readonly authApiService = inject(AuthApiService);

  getSecret() {
    return this.authApiService.getSecret();
  }

  login() {
    return this.authApiService.login();
  }

  checkSession() {
    return this.authApiService.checkSession();
  }
}
