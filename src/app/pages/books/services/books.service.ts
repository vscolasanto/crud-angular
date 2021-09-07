import { Injectable, Injector } from '@angular/core'
// import { Observable } from 'rxjs'
// import { switchMap } from 'rxjs/operators'

import { BaseResourceService } from 'src/app/shared/services/base-resource.service'
// import { Author } from '../../authors/models/author.model'
import { AuthorsService } from '../../authors/services/authors.service'
// import { Category } from '../../categories/models/category.model'
import { CategoriesService } from '../../categories/services/categories.service'

import { Book } from '../models/book.model'

@Injectable({
  providedIn: 'root'
})
export class BooksService extends BaseResourceService<Book> {

  constructor(
    protected injector: Injector,
    protected authorService: AuthorsService,
    protected categoriesService: CategoriesService
  ) {
    super('api/books', injector, Book.fromJson)
  }


  // create(book: Book): Observable<Book> {
  //   const authorId = book.authorId || 0
  //   const categoriesIds = book.categoriesIds || []

  //   return this.authorService.getById(authorId).pipe(
  //     switchMap(async author => {
  //       book.author = author

  //       return await this.categoriesService.getByIds(categoriesIds).then(
  //         categories => {
  //           book.categories = categories
  //           console.log(this)

  //           return book // como retornar o post do livro aqui?
  //         }
  //       )
  //     })
  //   )
  // }
}
