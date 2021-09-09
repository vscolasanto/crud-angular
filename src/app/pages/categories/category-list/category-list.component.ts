import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  constructor(
    private categoriesService: CategoriesService,
    protected injector: Injector
  ) {
    super(injector, categoriesService)
  }

  protected removeError() {
    return 'Erro ao remover Categoria.'
  }

  protected listError() {
    return 'Erro ao carregar listagem de categorias.'
  }
}
