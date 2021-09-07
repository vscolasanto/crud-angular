import { BaseResourceModel } from "src/app/shared/models/base-resource.model";
import { Author } from "../../authors/models/author.model";
import { Category } from "../../categories/models/category.model";

export class Book extends BaseResourceModel {
  constructor(
    public id?: number,
    public title?: string,
    public authorId?: number,
    public author?: Author,
    public release?: number,
    public pages?: number,
    public categoriesIds?: number[],
    public categories?: Category[]
  ) {
    super()
  }

  static fromJson(json: any): Book {
    return Object.assign(new Book(), json)
  }
}
