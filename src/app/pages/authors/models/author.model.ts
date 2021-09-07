import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Author extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public nationality?: string,
    public birthdate?: string
  ) {
    super()
  }

  static fromJson(json: any): Author {
    const author = Object.assign(new Author(), json)
    return author
  }
}
