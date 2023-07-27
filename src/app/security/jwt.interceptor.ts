import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient,
} from "@angular/common/http";
import { map, Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { Router } from "@angular/router";
import { AlertifyService } from "../service/alertify.service";
import { MessageService } from "primeng/api";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  timer: any = null;
  trabisTimer: any = null;
  request: any;
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageServiceEncrypt,
    private router: Router,
    private messageService: MessageService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }

    this.startTimer();
    return next.handle(request);
  }

  private tokenExpired(accessToken: string) {
    const expiry = JSON.parse(atob(accessToken.split(".")[1])).exp;
    if (this.authService.finish) {
      this.authService.finish += 1;
    } else {
      this.authService.finish =
        JSON.parse(atob(accessToken.split(".")[1])).exp -
        this.authService.verilenSure;
    }
    if (
      expiry - this.authService.finish ==
      this.authService.verilenSure - this.authService.uyariMesajKalanSure
    ) {
      this.authService.showConfirm();
    }
    this.authService.fark = expiry - this.authService.finish;
    return this.authService.finish >= expiry;
  }

  startTimer() {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    this.stopTimer();
    if (!currentUser) {
      return;
    }
    this.timer = setInterval(() => {
      let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
      if (
        currentUser &&
        currentUser.accessToken &&
        this.tokenExpired(currentUser.accessToken)
      ) {
        this.authService.logout();
        this.router.navigateByUrl("/");
        window.location.reload();
        clearInterval(this.timer);
        clearInterval(this.trabisTimer);
      }
      if (currentUser === null) {
        this.authService.logout();
        window.location.reload();
        clearInterval(this.timer);
      }
    }, 1000);

    // this.trabisTimer = setInterval(() => {
    //   let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    //   if (
    //     currentUser &&
    //     currentUser.accessToken &&
    //     this.tokenExpired(currentUser.accessToken)
    //   ) {
    //     clearInterval(this.trabisTimer);
    //   } else {
    //     this.trabisService.trabisOturumBaslat().subscribe(() => {});
    //   }
    // }, 300000);
  }

  stopTimer() {
    if (this.timer) {
      let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
      this.authService.finish =
        JSON.parse(atob(currentUser.accessToken.split(".")[1])).exp -
        this.authService.verilenSure;
      clearInterval(this.timer);
      clearInterval(this.trabisTimer);
    }
  }
}
