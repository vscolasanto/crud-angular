import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module')
      .then((m) => m.HomeModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./pages/authors/authors.module')
      .then((m) => m.AuthorsModule)
  },
  {
    path: 'books',
    loadChildren: () => import('./pages/books/books.module')
      .then((m) => m.BooksModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module')
      .then((m) => m.CategoriesModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
