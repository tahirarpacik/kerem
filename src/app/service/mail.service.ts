import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class MailService {
  private MAIL_PATH = "/mail";
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

  mailGonder(mailRequest): Observable<any> {
    return this.http
      .post(
        environment.BILDIRIM_BASE_PATH + this.MAIL_PATH + "/gonder",
        mailRequest
      )
      .pipe(catchError(this.handleError));
  }

  dogrulamaGonder(id): Observable<any> {
    return this.http
      .get(
        environment.BILDIRIM_BASE_PATH +
          this.MAIL_PATH +
          "/dogrulamaGonder?id=" +
          id,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  anketOlustuMail(email): Observable<any> {
    return this.http
      .get(
        environment.BILDIRIM_BASE_PATH +
          this.MAIL_PATH +
          "/anketOlustuMail?email=" +
          email,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  ozelAnketCevapVerdi(surveyId, email): Observable<any> {
    return this.http
      .get(
        environment.BILDIRIM_BASE_PATH +
          this.MAIL_PATH +
          "/ozelAnketCevapVerdi?surveySchemasId=" +
          surveyId +
          "&email=" +
          email,

        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  dogrulamaGonderMail(email): Observable<any> {
    return this.http
      .get(
        environment.BILDIRIM_BASE_PATH +
          this.MAIL_PATH +
          "/dogrulamaGonderMail?email=" +
          email,
        this.httpOptions
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
