import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import localePT from '@angular/common/locales/pt'

import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask'
import { ToastrModule } from 'ngx-toastr'
import { registerLocaleData } from '@angular/common'

registerLocaleData(localePT)

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgBrazil,
    TextMaskModule,
    ToastrModule.forRoot({
      timeOut: 7000,
      positionClass: 'toast-top-right',
      progressBar: true,
      progressAnimation: 'decreasing'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
