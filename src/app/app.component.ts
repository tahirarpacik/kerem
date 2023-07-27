import { Component, ViewEncapsulation } from "@angular/core";
import { MessageService, PrimeNGConfig } from "primeng/api";
import { Subscription } from "rxjs";
import { AppConfig } from "./models/appconfig";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { AuthenticationService } from "./security/authentication.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  config: AppConfig;

  subscription: Subscription;

  menuMode = "static";

  constructor(
    private messageService: MessageService,
    private localStorageService: LocalStorageServiceEncrypt,
    private authService: AuthenticationService,
  ) {}

  ngOnInit() {
    document.documentElement.style.fontSize = "14px";
  }
  onConfirm() {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    this.authService.finish =
      JSON.parse(atob(currentUser.accessToken.split(".")[1])).exp -
      this.authService.verilenSure;
    this.messageService.clear();
  }
  onReject() {
    this.messageService.clear();
  }
}
