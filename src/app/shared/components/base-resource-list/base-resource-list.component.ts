import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({ template: '' })
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  resources: T[] = []
  removeErrorMessage: string = ''
  listErrorMessage: string = ''

  constructor(
    protected baseResourceService: BaseResourceService<T>,
  ) { }

  ngOnInit(): void {
    this.getAll()
  }

  ngAfterContentChecked() {
    this.setErrorMessages()
  }

  getAll(): void {
    this.baseResourceService.getAll().subscribe(
      (response: T[]) => this.resources = response,
      (error: HttpErrorResponse) => console.error(this.listErrorMessage)
    )
  }

  remove(resource: T) {
    const mustRemove = confirm('Confirma a exclusão?')

    if (mustRemove) {
      resource.id && this.baseResourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(el => el != resource),
        (error: HttpErrorResponse) => console.error(this.removeErrorMessage)
      )
    }
  }

  protected setErrorMessages() {
      this.removeErrorMessage = this.removeError()
      this.listErrorMessage = this.listError()
  }

  protected removeError(): string {
    return 'Erro ao remover.'
  }

  protected listError(): string {
    return 'Erro ao carregar lista.'
  }
}
