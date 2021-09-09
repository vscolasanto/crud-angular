import { Component, Injector } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Book } from '../models/book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent extends BaseResourceListComponent<Book> {
  constructor(
    private booksService: BooksService,
    protected injector: Injector
  ) {
    super(injector, booksService)
  }

  protected removeError() {
    return 'Erro ao remover Livro.'
  }

  protected listError() {
    return 'Erro ao carregar listagem de livros.'
  }
}
