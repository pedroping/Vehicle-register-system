/* tslint:disable:no-unused-variable */

import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';
import { skip, take } from 'rxjs';
import { CategoriesApiService } from '../../api/categories-api/categories-api.service';
import { CategoriesFacade } from './categories-facade.service';

describe('Service: CategoriesFacade', () => {
  let service: CategoriesFacade;

  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CategoriesApiService,
        provideHttpClientTesting(),
        provideHttpClient(),
        {
          provide: ENVIRONMENT_TOKEN,
          useValue: 'http://localhost:3000',
        },
      ],
    });
    service = TestBed.inject(CategoriesFacade);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('setCategories()', () => {
    it('should do return an array of categories', (done) => {
      service
        .getCategories$$()
        .pipe(skip(1), take(1))
        .subscribe((categories) => {
          expect(Array.isArray(categories)).toBeTrue();
          done();
        });
    });
  });

  describe('getBrandById()', () => {
    it('should do return an category', (done) => {
      service.getCategoryById(0).subscribe((caregory) => {
        expect(caregory).toBeTruthy();
        done();
      });
    });
  });

  describe('get categories()', () => {
    it('should do return an empty array', () => {
      expect(service.categories.length).toBe(0);
    });
  });
});
