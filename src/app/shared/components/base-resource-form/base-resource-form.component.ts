import { HttpErrorResponse } from "@angular/common/http";
import { AfterContentChecked, Component, Inject, Injector, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BaseResourceModel } from "../../models/base-resource.model";
import { BaseResourceService } from "../../services/base-resource.service";

@Component({ template: '' })
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string
  resourceForm: FormGroup
  pageTitle: string
  serverErrorMessage: string[] | null = null
  submittingForm: boolean = false
  isLoading: boolean;

  protected route: ActivatedRoute
  protected router: Router
  protected formBuilder: FormBuilder
  protected toastr: ToastrService

  constructor(
    protected injector: Injector,
    @Inject('resource') public resource: T,
    protected baseResourceService: BaseResourceService<T>,
    @Inject('jsonDataToResourceFn') protected jsonDataToResourceFn: (json: any) => T,
  ) {
    this.route = this.injector.get(ActivatedRoute)
    this.router = this.injector.get(Router)
    this.formBuilder = this.injector.get(FormBuilder)
    this.toastr = this.injector.get(ToastrService)
  }

  ngOnInit() {
    this.setCurrentAction()
    this.buildResourceForm()
    this.loadResource()
  }

  ngAfterContentChecked() {
    this.setPageTitle()
  }

  submitForm() {
    this.submittingForm = true

    if (this.currentAction === 'new') {
      this.createResource()
    } else {
      this.updateResource()
    }
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new'
    } else {
      this.currentAction = 'edit'
    }
  }

  protected abstract buildResourceForm(): void

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.isLoading = true;

      const id = Number(this.route.snapshot.params.id)

      this.baseResourceService.getById(id).subscribe(
        (resource: T) => {
          this.resource = resource
          this.resourceForm.patchValue(resource)
        },
        (error: HttpErrorResponse) => console.error(error),
        () => this.isLoading = false
      )
    }
  }

  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = this.createPageTitle()
    } else {
      this.pageTitle = this.editPageTitle()
    }
  }

  protected createPageTitle(): string {
    return 'Novo'
  }

  protected editPageTitle(): string {
    return 'Editar'
  }

  protected createResource() {
    this.isLoading = true
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

    this.baseResourceService.create(resource).subscribe(
      (response: T) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error),
      () => this.isLoading = false
    )
  }

  protected updateResource() {
    this.isLoading = true
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)

    this.baseResourceService.update(resource).subscribe(
      (response: T) => this.actionForSuccess(response),
      (error: HttpErrorResponse) => this.actionForError(error),
      () => this.isLoading = false
    )
  }

  protected actionForSuccess(resource: T) {
    this.showToastr('success', 'Solicitação processada com sucesso!', 'Sucesso!')

    if (this.route.snapshot.parent) {
      const baseComponentPath: string = this.route.snapshot.parent.url[0].path;

      this.router.navigateByUrl(baseComponentPath, { skipLocationChange: true})
        .then(
          () => this.router.navigate([baseComponentPath, resource.id, 'edit'])
        )
    }
  }

  protected actionForError(error: any) {
    this.showToastr('error', 'Ocorreu um erro ao processar a solicitação!', 'Erro!')

    this.submittingForm = false

    if (error.status === 422) {
      this.serverErrorMessage = JSON.parse(error._body).errors
    } else {
      this.serverErrorMessage = ['Falha na comunicação com o servidor. Tente mais tarde.']
    }
  }

  protected showToastr(
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    title: string
  ) {
    this.toastr[type](message, title);
  }
}
