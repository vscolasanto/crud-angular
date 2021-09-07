import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Author } from './pages/authors/models/author.model'
import { Book } from './pages/books/models/book.model'
import { Category } from './pages/categories/models/category.model'

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const authors: Author[] = [
      { id: 1, name: 'Ken Follet', nationality: 'País de Gales', birthdate: '05/06/1949' },
      { id: 2, name: 'Charles Bukowski', nationality: 'Alemanha', birthdate: '16/08/1920' },
      { id: 3, name: 'Philip K. Dick', nationality: 'Estados Unidos', birthdate: '16/12/1928' },
      { id: 4, name: 'Stephen King', nationality: 'Estados Unidos', birthdate: '21/09/1947' }
    ]

    const categories: Category[] = [
      { id: 1, name: 'Comédia', backgroundColor: '#124584', textColor: '#f2f2f2' },
      { id: 2, name: 'Romance', backgroundColor: '#a2b369', textColor: '#659832' },
      { id: 3, name: 'Terror', backgroundColor: '#308498', textColor: '#fff' },
      { id: 4, name: 'Terror Psicológico', backgroundColor: '#12ab0c', textColor: '#fff' },
      { id: 5, name: 'Suspense', backgroundColor: '#336a8b', textColor: '#888888' },
      { id: 6, name: 'Aventura', backgroundColor: '#ababab', textColor: '#905509' },
      { id: 7, name: 'Policial', backgroundColor: '#3210ba', textColor: '#020202' },
      { id: 8, name: 'Ficção Científica', backgroundColor: '#3f32f2', textColor: '#12525d' },
      { id: 9, name: 'Ficção Distópica', backgroundColor: '#458abb', textColor: '#326598' },
      { id: 10, name: 'Suspense Psicológico', backgroundColor: '#ff0055', textColor: '#fff000' },
      { id: 11, name: 'Fantasia', backgroundColor: '#a326c1', textColor: '#ffff' }
    ]

    const books: Book[] = [
      {
        id: 1,
        title: 'O Iluminado',
        authorId: authors[3].id,
        author: authors[3],
        categoriesIds: [categories[2].id, categories[3].id, categories[4].id],
        categories: [categories[2], categories[3], categories[4]],
        pages: 520,
        release: 1977
      } as Book,
      {
        id: 2,
        title: 'A Dança da Morte',
        authorId: authors[3].id,
        author: authors[3],
        categoriesIds: [categories[2].id, categories[3].id, categories[4].id],
        categories: [categories[2], categories[3], categories[4]],
        pages: 1247,
        release: 1978
      } as Book,
      {
        id: 3,
        title: 'O Tempo Desconjuntado',
        authorId: authors[2].id,
        author: authors[2],
        categoriesIds: [categories[8].id, categories[9].id, categories[2].id],
        categories: [categories[8], categories[9], categories[2]],
        pages: 272,
        release: 1959
      } as Book,
    ]

    return { authors, categories, books }
  }
}
