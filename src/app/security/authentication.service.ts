import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  finish: any;
  verilenSure: any = 1800;
  uyariMesajKalanSure: any = 1740;
  fark: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageServiceEncrypt,
    private messageService: MessageService,
    private router: Router
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };

  clearStorage() {
    this.finish = null;
    this.verilenSure = null;
    this.uyariMesajKalanSure = null;
    this.fark = null;
  }
  showConfirm() {
    this.messageService.add({
      key: "c",
      sticky: true,
      severity: "warn",
      summary: "Oturum Süreniz Dolmak Üzere",
      detail: "Devam etmek istiyor musunuz?",
    });
  }

  login(phoneNumber: string, password: string) {
    return this.http
      .post<any>(
        environment.API_BASE_PATH + "/login/signin",
        { phoneNumber, password },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.accessToken) {
            this.localStorageService.set("currentUser", JSON.stringify(user));
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  loginWithUsername(username: string, password: string) {
    return this.http
      .post<any>(
        environment.API_BASE_PATH + "/login/signinUsername",
        { username, password },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.accessToken) {
            this.localStorageService.set("currentUser", JSON.stringify(user));
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }
  loginWithEmail(mail: string, password: string) {
    return this.http
      .post<any>(
        environment.API_BASE_PATH + "/login/signinMail",
        { mail, password },
        this.httpOptions
      )
      .pipe(
        map((user) => {
          if (user && user.accessToken) {
            this.localStorageService.set("currentUser", JSON.stringify(user));
          }
          return user;
        }),
        catchError(this.handleError)
      );
  }

  findByPhoneNumber(phone): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH + "/login/findByPhoneNumber?phone=" + phone,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findByUsername(username): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH +
          "/kullanici/findByUsername?username=" +
          username,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findByEmail(email): Observable<any> {
    return this.http
      .get(
        environment.API_BASE_PATH + "/login/findByEmail?email=" + email,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  register(registerData) {
    return this.http
      .post<any>(
        environment.API_BASE_PATH + "/login/signup",
        registerData,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updatePassword(kullanici) {
    return this.http
      .post<any>(
        environment.API_BASE_PATH + "/login/updatePassword",
        kullanici,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.localStorageService.remove("currentUser");
    this.router.navigateByUrl("/");
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
