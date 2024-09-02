/* tslint:disable:no-unused-variable */

import { HttpClient, provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BrandsApiService } from '@core/services/api/brands-api/brands-api.service';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { skip, take } from 'rxjs';
import { BrandsFacade } from './brands-facade.service';

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

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('setBrands()', () => {
    it('should do return an array of brands', (done) => {
      service
        .getBrands$$()
        .pipe(skip(1), take(1))
        .subscribe((brands) => {
          expect(Array.isArray(brands)).toBeTrue();
          done();
        });
    });
  });

  describe('getBrandById()', () => {
    it('should do return an brand', (done) => {
      service.getBrandById(0).subscribe((brand) => {
        expect(brand).toBeTruthy();
        done();
      });
    });
  });
});
