import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { SurveyResult } from "../models/surveyResult.model";
import { SurveySchema } from "../models/surveySchema.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class SurveyResultService extends BaseService<SurveyResult> {
  private SURVEY_PATH = "/surveyResult";
  private http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.SURVEY_BASE_PATH, "survey");
    this.http = httpClient;
  }

  createResultForAdmin(schemaId, quantity, content): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/createResultForAdmin?schemaId=" +
          schemaId +
          "&quantity=" +
          quantity,
        content,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  createResult(schemaId, content): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/createResult?schemaId=" +
          schemaId,
        content,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  getResultsOfSurvey(schemaId): Observable<any> {
    return this.http
      .get(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getResultsOfSurvey?schemaId=" +
          schemaId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  getReelResultsQuantityOfSurvey(schemaId): Observable<any> {
    return this.http
      .get(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getReelResultsQuantityOfSurvey?schemaId=" +
          schemaId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getAdminResultsOfSurvey(schemaId): Observable<any> {
    return this.http
      .get(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getAdminResultsOfSurvey?schemaId=" +
          schemaId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getResultsQuantityOfSurvey(schemaId): Observable<any> {
    return this.http
      .get(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getResultsQuantityOfSurvey?schemaId=" +
          schemaId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
