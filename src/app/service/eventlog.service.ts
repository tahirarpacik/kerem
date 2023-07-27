import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Eventlog } from "../models/eventlog.model";
import { Kullanici } from "../models/kullanici.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class EventlogService extends BaseService<Eventlog> {
  private POST_PATH = "/eventlog";
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.API_BASE_PATH, "eventlog");
    this.http = httpClient;
  }

  listAll(basvuruId): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          this.POST_PATH +
          "/list?basvuruId=" +
          basvuruId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
