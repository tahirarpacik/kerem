import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class SmsService {
  private SMS_PATH = "/sms";
  private http: HttpClient;

  isKurumsal: Boolean = true;

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  constructor(httpClient: HttpClient) {
    this.http = httpClient;
  }

  dogrulamaGonderSurvey(surveySchemasId, phoneNumber): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH +
          this.SMS_PATH +
          "/sendCode?phoneNumber=" +
          phoneNumber,
        surveySchemasId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  inputCode(surveySchemasId, code): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH +
          this.SMS_PATH +
          "/inputCode?code=" +
          code,
        surveySchemasId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  inputCodeRegistry(code): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH +
          this.SMS_PATH +
          "/inputCodeRegistry?code=" +
          code,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  dogrulamaGonder(phoneNumber): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH + this.SMS_PATH + "/verificationCode",
        phoneNumber
      )
      .pipe(catchError(this.handleError));
  }

  sifreSifirla(smsRequest): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH + this.SMS_PATH + "/sifreSifirla",
        smsRequest
      )
      .pipe(catchError(this.handleError));
  }

  geciciSifreGonder(smsRequest): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH + this.SMS_PATH + "/tempPass",
        smsRequest
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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
}
