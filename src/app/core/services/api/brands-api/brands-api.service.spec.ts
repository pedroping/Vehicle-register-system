/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { BrandsApiService } from './brands-api.service';

describe('Service: BrandsApi', () => {
  let service: BrandsApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(BrandsApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBrands()', () => {
    it('should do return 100 brands', (done) => {
      service.getBrands().subscribe((brands) => {
        expect(brands.length).toEqual(100);
        done();
      });
    });
  });

  describe('getBrand()', () => {
    it('should do return 100 brands', (done) => {
      service.getBrand(0).subscribe((brand) => {
        expect(brand.id).toEqual('0');
        done();
      });
    });
  });
});
