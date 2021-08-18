import { LOCALE_ID, NgModule } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import localePT from '@angular/common/locales/pt'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'

import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask'

registerLocaleData(localePT)

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgBrazil,
    TextMaskModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" }
  ]
})
export class CoreModule { }
