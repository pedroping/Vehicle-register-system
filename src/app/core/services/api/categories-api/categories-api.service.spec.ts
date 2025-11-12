/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { CategoriesApiService } from './categories-api.service';

describe('Service: CategoriesApi', () => {
  let service: CategoriesApiService;
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
    service = TestBed.inject(CategoriesApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories()', () => {
    it('should do get 5 categories', (done) => {
      service.getCategories().subscribe((categories) => {
        expect(categories.length).toEqual(5);
        done();
      });
    });
  });

  describe('getCategory()', () => {
    it('should do get an category', (done) => {
      service.getCategory(1).subscribe((categorie) => {
        expect(categorie.description).toEqual('B - Carros, picapes e vans');
        done();
      });
    });
  });
});
