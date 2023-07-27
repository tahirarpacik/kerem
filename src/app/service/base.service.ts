import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Base } from "../models/base";

@Injectable({
  providedIn: "root",
})
export class BaseService<T extends Base> {
  constructor(
    private httpClient: HttpClient,
    private url: string,
    private endpoint: string
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  //#region [ Public ]
  get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.url}/${this.endpoint}`)
      .pipe(catchError(this.handleError));
  }

  getById(id: string): Observable<T> {
    return this.httpClient
      .get<T>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(item: T): Observable<T> {
    return this.httpClient
      .post<T>(
        `${this.url}/${this.endpoint}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(
        `${this.url}/${this.endpoint}/${item.id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  delete(id: number) {
    return this.httpClient
      .delete<T>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  //#endregion

  //#region [ Private ]
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      //error client
      errorMessage = error.error.message;
    } else {
      //error server
      errorMessage =
        `Servis Hatası Oluştu: ${error.status}, ` + `message: ${error.message}`;
    }

    return throwError(errorMessage);
  }
  //#endregion
}
