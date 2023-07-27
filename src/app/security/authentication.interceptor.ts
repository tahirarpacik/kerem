import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private localStorageService: LocalStorageServiceEncrypt
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let currentUser = JSON.parse(
          this.localStorageService.get("currentUser")
        );

        if (
          currentUser &&
          currentUser.accessToken &&
          this.tokenExpired(currentUser.accessToken)
        ) {
          this.authService.logout();
          this.router.navigateByUrl("/");
        }
        this.messageService.add({
          severity: "error",
          summary: "Hata",
          detail: err.error,
        });
        const error = err.error || err.statusText;
        return throwError(error);
      })
    );
  }

  private tokenExpired(accessToken: string) {
    const expiry = JSON.parse(atob(accessToken.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}
