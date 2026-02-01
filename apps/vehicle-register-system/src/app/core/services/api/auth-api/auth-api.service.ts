import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT_TOKEN } from '@tokens';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  getSecret() {
    return this.http.get(`${this.environment}/secret/${process?.env?.['VERY_SECRET']}`);
  }

  login() {
    return this.http.post(`${this.environment}/login`, { password: 'Test123' });
  }

  checkSession() {
    return this.http.get(`${this.environment}/session`).pipe(map(() => true));
  }
}
