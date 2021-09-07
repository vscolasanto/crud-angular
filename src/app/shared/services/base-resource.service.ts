import { Observable, throwError } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { map, catchError } from 'rxjs/operators'

import { BaseResourceModel } from "../models/base-resource.model"
import { Injector } from "@angular/core"

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient

  constructor(
    protected apiUrl: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (json: any) => T
  ) {
    this.http = injector.get(HttpClient)
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError),
    )
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${resource.id}`, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
      )
    }

    delete(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        map(() => null),
        catchError(this.handleError)
    )
  }

  protected jsonDataToResource(json: any): T {
    return this.jsonDataToResourceFn(json)
  }

  protected jsonDataToResources(json: any[]): T[] {
    const resources: T[] = []
    json.forEach(resource => resources.push(
      this.jsonDataToResourceFn(resource)
    ))
    return resources
  }

  protected handleError(error: any): Observable<any> {
    console.error('erro', error)
    return throwError(error)
  }
  /**
   * protected para caso haja necessidade de acessar estes métodos a partir
   * da classe que herda o BaseResourceService
  */
}
