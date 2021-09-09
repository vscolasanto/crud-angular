import { HttpErrorResponse } from '@angular/common/http';
import { AfterContentChecked, Component, Injector, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

@Component({ template: '' })
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  resources: T[] = []
  removeErrorMessage: string = ''
  listErrorMessage: string = ''
  isLoading: boolean = true;

  protected toastr: ToastrService

  constructor(
    protected injector: Injector,
    protected baseResourceService: BaseResourceService<T>,
  ) {
    this.toastr = this.injector.get(ToastrService)
  }

  ngOnInit(): void {
    this.getAll()
  }

  ngAfterContentChecked() {
    this.setErrorMessages()
  }

  getAll(): void {
    this.isLoading = true;

    this.baseResourceService.getAll().subscribe(
      (response: T[]) => this.resources = response,
      (error: HttpErrorResponse) => console.error(this.listErrorMessage),
      () => this.isLoading = false
    )
  }

  remove(resource: T) {
    const mustRemove = confirm('Confirma a exclusão?')

    if (mustRemove) {
      this.isLoading = true;
      resource.id && this.baseResourceService.delete(resource.id).subscribe(
        () => {
          this.resources = this.resources.filter(el => el != resource)
          this.showToastr('success', 'Item removido com sucesso!', 'Sucesso!')
        },
        (error: HttpErrorResponse) => console.error(this.removeErrorMessage),
        () => this.isLoading = false
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

  protected showToastr(
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    title: string
  ) {
    this.toastr[type](message, title);
  }
}
