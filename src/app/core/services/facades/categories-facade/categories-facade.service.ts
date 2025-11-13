import { inject, Injectable } from '@angular/core';
import { ICategory } from '@shared/models';
import { BehaviorSubject } from 'rxjs';
import { CategoriesApiService } from '../../api/categories-api/categories-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFacade {
  private readonly categoriesApi = inject(CategoriesApiService);
  private readonly categories$ = new BehaviorSubject<ICategory[]>([]);

  private setCategories() {
    this.categoriesApi.getCategories().subscribe((categories) => this.categories$.next(categories));
  }

  getCategories$$() {
    if (this.categories$.value.length <= 0) {
      this.setCategories();
    }

    return this.categories$.asObservable();
  }

  get categories() {
    return this.categories$.value;
  }

  getCategoryById(id: number) {
    return this.categoriesApi.getCategory(id);
  }
}
