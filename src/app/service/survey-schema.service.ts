import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, retry } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { SurveySchema } from "../models/surveySchema.model";
import { BaseService } from "./base.service";

@Injectable({
  providedIn: "root",
})
export class SurveySchemaService extends BaseService<SurveySchema> {
  private SURVEY_PATH = "/survey";
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

  getByPageRequest(pageRequest, filter): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getByPageRequest?filter=" +
          filter,
        pageRequest,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getBySurveyList(pageRequest): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH + this.SURVEY_PATH + "/getBySurveyList",
        pageRequest,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  getBySurveyListMainPage(pageRequest): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getBySurveyListMainPage",
        pageRequest,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getByPrivateSurveySchemas(): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getByPrivateSchemas",
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteById(schemaId): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH + this.SURVEY_PATH + "/deleteById",
        schemaId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  verifyShareCode(surveyId, shareCode): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/verifyShareCode?shareCode=" +
          shareCode,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  telefonDogrula(surveyId, telNo): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/telefonDogrula?telNo=" +
          telNo,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  ipDogrula(surveyId, ip): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH + this.SURVEY_PATH + "/ipVerify?ip=" + ip,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getTelefonlar(surveyId, telNo): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/telefonlar?telNo=" +
          telNo,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  emailDogrula(surveyId, email): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/emailDogrula?email=" +
          email,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getEmails(surveyId, email): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/emails?email=" +
          email,
        surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getByPageRequestOlusturan(
    olusturanKullaniciEmail,
    pageRequest
  ): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/getByOlusturanPage?olusturanKullaniciEmail=" +
          olusturanKullaniciEmail,
        pageRequest,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
  saveSurveyName(surveyName, surveyId): Observable<any> {
    return this.http
      .post(
        environment.SURVEY_BASE_PATH +
          this.SURVEY_PATH +
          "/saveSurveyName?surveyName=" +
          surveyName +
          "&surveyId=" +
          surveyId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }
}
