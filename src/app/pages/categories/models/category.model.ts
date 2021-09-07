import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Category extends BaseResourceModel {
  constructor(
    public id?: number,
    public name?: string,
    public backgroundColor?: string,
    public textColor?: string,
  ) {
    super()
  }

  static fromJson(json: any): Category {
    return Object.assign(new Category(), json)
  }
}
