import { LOCALE_ID, NgModule } from '@angular/core'
import { CommonModule, registerLocaleData } from '@angular/common'
import localePT from '@angular/common/locales/pt'
import { RouterModule } from '@angular/router'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDatabase } from '../in-memory-database'

import { NgBrazil } from 'ng-brazil'
import { TextMaskModule } from 'angular2-text-mask';
import { NavbarComponent } from './components/navbar/navbar.component'

registerLocaleData(localePT)

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase),
    NgBrazil,
    TextMaskModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NavbarComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt" }
  ]
})
export class CoreModule { }
