import { Component, Injector } from '@angular/core'
import { Validators } from '@angular/forms'
import { IDropdownSettings } from 'ng-multiselect-dropdown'
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component'
import { Author } from '../models/author.model'
import { AuthorsService } from '../services/authors.service'
import { COUNTRIES, Country } from 'src/app/shared/utils/countries'
import { switchMap } from 'rxjs/operators'
import { HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent extends BaseResourceFormComponent<Author> {
  countries: Country[] = []
  dropdownSettings: IDropdownSettings = {}

  constructor(
    protected authorService: AuthorsService,
    protected injector: Injector,
  ) {
    super(injector, new Author(), authorService, Author.fromJson)
  }

  ngOnInit() {
    super.ngOnInit()
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'name',
      textField: 'name',
      allowSearchFilter: true,
      showSelectedItemsAtTop: true,
      searchPlaceholderText: 'Pesquisar'
    }
  }

  protected loadCountries() {
    this.countries = COUNTRIES.sort((a, b) => a.name.localeCompare(b.name))
    return this.countries
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.isLoading = true;

      const id = Number(this.route.snapshot.params.id)

      this.baseResourceService.getById(id).subscribe(
        (resource: Author) => {
          console.log(resource)
          this.resource = Object.assign(resource, {
            nationality: [{ name: resource.nationality }]
          })
          this.resourceForm.patchValue(resource)
          this.loadCountries()
        },
        (error: HttpErrorResponse) => console.error(error),
        () => this.isLoading = false
      )
    } else {
      this.loadCountries()
    }
  }

  protected createResource() {
    this.isLoading = true;

    const obj = Object.assign(this.resourceForm.value, {
      nationality: this.resourceForm.get('nationality')?.value[0].name
    })
    const resource: Author = this.jsonDataToResourceFn(obj)

    this.baseResourceService.create(resource).subscribe(
      (response: Author) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error),
      () => this.isLoading = false
    )
  }

  protected updateResource() {
    this.isLoading = true

    const obj = Object.assign(this.resourceForm.value, {
      nationality: this.resourceForm.get('nationality')?.value[0].name
    })
    const resource: Author = this.jsonDataToResourceFn(obj)

    this.baseResourceService.update(resource).subscribe(
      (response: Author) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error),
      () => this.isLoading = false
    )
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(3)]],
      nationality: [null],
      birthdate: [null],
    })
  }

  protected createPageTitle(): string {
    return 'Novo Autor'
  }

  protected editPageTitle(): string {
    const authorName = this.resource.name || ''
    return `Editar Autor: ${authorName}`
  }
}
