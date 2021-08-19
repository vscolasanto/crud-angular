import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorFormComponent } from './author-form/author-form.component';
import { AuthorListComponent } from './author-list/author-list.component';

const routes: Routes = [
  { path: '', component: AuthorListComponent },
  { path: 'new', component: AuthorFormComponent },
  { path: ':id/edit', component: AuthorFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
