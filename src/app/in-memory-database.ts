import { InMemoryDbService } from 'angular-in-memory-web-api'
import { Author } from './pages/authors/models/author.model'

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const authors: Author[] = [
      { id: 1, name: 'Ken Follet', nationality: 'País de Gales', birthdate: '1949-06-05T00:00:00.000Z' },
      { id: 2, name: 'Charles Bukowski', nationality: 'Alemanha', birthdate: '1920-08-16T00:00:00.000Z' }
    ]

    return { authors }
  }
}
