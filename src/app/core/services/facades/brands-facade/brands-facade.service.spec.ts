/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BrandsFacade } from './brands-facade.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { BrandsApiService } from '@core/services/api/brands-api/brands-api.service';

describe('Service: BrandsFacade', () => {
  let service: BrandsFacade;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        BrandsApiService,
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(BrandsFacade);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
