import { inject, Injectable } from '@angular/core';
import { CategoriesApiService } from '@core/services/api';
import { ICategory } from '@shared/models';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFacade {
  private readonly categoriesApi = inject(CategoriesApiService);
  private readonly categories$ = new BehaviorSubject<ICategory[]>([]);

  private setCategories() {
    this.categoriesApi
      .getCategories()
      .subscribe((categories) => this.categories$.next(categories));
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
    return this.getCategories$$().pipe(
      map((categories) => {
        return categories.find((category) => category.id === id.toString());
      })
    );
  }
}
