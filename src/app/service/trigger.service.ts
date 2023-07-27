import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { BaseService } from "./base.service";
import { Trigger } from "../models/trigger.model";

@Injectable({
  providedIn: "root",
})
export class TriggerService extends BaseService<Trigger> {
  private SURVEY_PATH = "/trigger";
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.SURVEY_BASE_PATH, "trigger");
    this.http = httpClient;
  }

  startTrigger(triggerId): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/startTrigger?triggerId=" +
          triggerId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createResult(trigger): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH + this.SURVEY_PATH + "/createResult",
        trigger,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  stopTrigger(triggerId): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/stopTrigger?triggerId=" +
          triggerId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  startAllTrigger(): Observable<any> {
    return this.http
      .get(
        environment.SURVEY_BASE_PATH + this.SURVEY_PATH + "/startAllTrigger",
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
