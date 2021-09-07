import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  constructor(
    protected categoriesService: CategoriesService,
    protected injector: Injector
  ) {
    super(injector, new Category(), categoriesService, Category.fromJson)
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      backgroundColor: ['#000000', Validators.required],
      textColor: ['#FFFFFF', Validators.required]
    })
  }

  protected createPageTitle(): string {
    return 'Nova Categoria'
  }

  protected editPageTitle(): string {
    const categoryName = this.resource.name || ''
    return `Editar Categoria: ${categoryName}`
  }
}
