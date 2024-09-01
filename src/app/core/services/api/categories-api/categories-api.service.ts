import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '@shared/models';
import { ENVIRONMENT_TOKEN } from '@shared/tokens';

@Injectable({
  providedIn: 'root',
})
export class CategoriesApiService {
  private readonly http = inject(HttpClient);
  private readonly environment = inject(ENVIRONMENT_TOKEN);

  private readonly CATEGORIES = 'categories';

  getCategories() {
    return this.http.get<ICategory[]>(`${this.environment}/${this.CATEGORIES}`);
  }

  getCategory(id: number | string) {
    return this.http.get<ICategory>(
      `${this.environment}/${this.CATEGORIES}/${id}`
    );
  }
}
