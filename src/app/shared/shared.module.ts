import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { ToastrModule } from 'ngx-toastr'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NoContentFoundComponent } from './components/no-content-found/no-content-found.component'

@NgModule({
  declarations: [
    NumbersOnlyDirective,
    BreadcrumbComponent,
    PageTitleComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent,
    LoadingComponent,
    NoContentFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing'
    }),
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ToastrModule,
    NgMultiSelectDropDownModule,
    NumbersOnlyDirective,
    BreadcrumbComponent,
    PageTitleComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent,
    LoadingComponent,
    NoContentFoundComponent
  ],
})
export class SharedModule { }
