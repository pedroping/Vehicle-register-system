import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthFacadeService {
  token = 'test-token';
  
  constructor() {}
}
