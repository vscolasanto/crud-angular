import { Component, Injector } from '@angular/core'
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component'
import { Author } from '../models/author.model'
import { AuthorsService } from '../services/authors.service'

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent extends BaseResourceListComponent<Author> {
  constructor(
    protected authorService: AuthorsService,
    protected injector: Injector
  ) {
    super(injector, authorService)
  }

  protected removeError() {
    return 'Erro ao remover Autor.'
  }

  protected listError() {
    return 'Erro ao carregar listagem de Autores.'
  }
}
