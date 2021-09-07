import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar'
import { AuthorsRoutingModule } from './authors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorFormComponent } from './author-form/author-form.component';

@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorFormComponent,
  ],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule,
    CalendarModule,
  ]
})
export class AuthorsModule { }
