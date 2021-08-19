import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'authors',
    loadChildren: () => import('./pages/authors/authors.module')
      .then((m) => m.AuthorsModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./pages/books/books.module')
      .then((m) => m.BooksModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
