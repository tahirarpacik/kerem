import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Kullanici } from "../models/kullanici.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService<Kullanici> {
  private USER_PATH = "/kullanici";
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.API_BASE_PATH, "kullanici");
    this.http = httpClient;
  }

  getByPageRequest(pageRequest, filter): Observable<any> {
    return this.http
      .post(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/getByPageRequest?filter=" +
          filter,
        pageRequest,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  checkEmailAvailability(email): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/checkEmailAvailability?email=" +
          email,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  checkPhoneAvailability(phone): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/checkPhoneAvailability?phone=" +
          phone,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findByPhoneNumber(phone): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/findByPhoneNumber?phone=" +
          phone,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findByEmail(email): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/findByEmail?email=" +
          email,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findByTcNo(tcNo): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH + this.USER_PATH + "/findByTcNo?tcNo=" + tcNo,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getHakems(): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH + this.USER_PATH + "/getHakems",
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // listAll(): Observable<any> {
  //   return this.http
  //     .get(environment.API_BASE_PATH + this.USER_PATH, this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }

  saveWithoutVertification(kullanici: Kullanici): Observable<any> {
    return this.http
      .post(
        environment.API_BASE_PATH +
          this.USER_PATH +
          "/saveWithoutVertification",
        kullanici,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
