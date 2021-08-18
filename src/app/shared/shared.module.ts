import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule
  ]
})
export class SharedModule { }
