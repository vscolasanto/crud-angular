import { HttpErrorResponse } from '@angular/common/http'
import { Component, Injector, OnInit } from '@angular/core'
import { Validators } from '@angular/forms'
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { switchMap } from 'rxjs/operators'
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component'
import { Author } from '../../authors/models/author.model'
import { AuthorsService } from '../../authors/services/authors.service'
import { Category } from '../../categories/models/category.model'
import { CategoriesService } from '../../categories/services/categories.service'
import { Book } from '../models/book.model'
import { BooksService } from '../services/books.service'

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent extends BaseResourceFormComponent<Book> implements OnInit {

  authors: Author[] = []
  authorsSettings: IDropdownSettings
  categories: Category[] = []
  categoriesSettings: IDropdownSettings

  constructor(
    protected injector: Injector,
    protected booksService: BooksService,
    protected authorsService: AuthorsService,
    protected categoriesService: CategoriesService
  ) {
    super(injector, new Book(), booksService, Book.fromJson)
  }

  ngOnInit() {
    super.ngOnInit()
    this.authorsSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      allowSearchFilter: true,
      showSelectedItemsAtTop: true,
      searchPlaceholderText: 'Pesquisar',
      limitSelection: 3
    }
    this.categoriesSettings = {
      ...this.authorsSettings,
      singleSelection: false
    }
  }

  protected getAllCategories() {
    this.categoriesService.getAll().subscribe(
      (response: Category[]) => {
        this.categories = response
      }
    )
  }

  protected getAllAuthors() {
    this.authorsService.getAll().subscribe(
      (response: Author[]) => {
        this.authors = response
      }
    )
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params =>
          this.baseResourceService.getById(Number(params.get('id')))
        )
      ).subscribe(
        (resource: Book) => {
          this.resource = Object.assign(resource, {
            author: [{ id: resource?.author?.id , name: resource?.author?.name }]
          })
          this.resourceForm.patchValue(resource)
          this.getAllAuthors()
          this.getAllCategories()
        }
      )
    } else {
      this.getAllAuthors()
      this.getAllCategories()
    }
  }

  protected async createResource() {
    const resource = await this.formatBookObject()

    this.baseResourceService.create(resource).subscribe(
      (response: Book) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error)
    )
  }

  protected async updateResource() {
    const resource = await this.formatBookObject()

    this.baseResourceService.update(resource).subscribe(
      (response: Book) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error)
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(3)]],
      categories: [null],
      author: [null],
      pages: [null],
      release: [null]
    })
  }

  protected createPageTitle(): string {
    return 'Novo Livro'
  }

  protected editPageTitle(): string {
    const bookTitle = this.resource.title || ''
    return `Editar Livro: ${bookTitle}`
  }

  private async formatBookObject() {
    const authorId = this.resourceForm.get('author')?.value[0].id

    const author = await this.authorsService.getById(authorId).toPromise().then(
      (response: Author) => response
    )

    const categoriesIds = this.resourceForm.get('categories')?.value
      .map((category: Category) => category.id)

    const categories = await this.categoriesService.getByIds(categoriesIds).then(
      (response: Category[]) => response
    )

    const obj: Book = Object.assign(this.resourceForm.value, {
      authorId,
      author,
      categoriesIds,
      categories
    })

    return this.jsonDataToResourceFn(obj)
  }
}
