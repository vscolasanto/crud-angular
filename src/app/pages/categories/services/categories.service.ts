import { Injectable, Injector } from '@angular/core'

import { Category } from '../models/category.model'
import { BaseResourceService } from 'src/app/shared/services/base-resource.service'
import { AuthorsService } from '../../authors/services/authors.service'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseResourceService<Category> {

  constructor(
    protected injector: Injector,
    protected authorsService: AuthorsService
  ) {
    super('api/categories', injector, Category.fromJson)
  }

  async getByIds(ids: number[]): Promise<Category[]> {
    let categories: Category[] = []

    for (let id of ids) {
      await this.getById(id).toPromise().then((category: Category) => {
        categories.push(category)
      })
    }

    return categories
  }
}
