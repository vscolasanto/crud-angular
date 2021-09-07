import { Injectable, Injector } from '@angular/core'

import { Author } from '../models/author.model'
import { BaseResourceService } from 'src/app/shared/services/base-resource.service'

@Injectable({
  providedIn: 'root'
})
export class AuthorsService extends BaseResourceService<Author> {

  constructor(protected injector: Injector) {
    super('api/authors', injector, Author.fromJson)
  }
}
