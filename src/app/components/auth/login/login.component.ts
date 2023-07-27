import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppConfig } from "../../../models/appconfig";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertifyService } from "src/app/service/alertify.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "src/app/security/authentication.service";
import { HttpErrorResponse } from "@angular/common/http";
import { DialogService } from "primeng/dynamicdialog";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { UserService } from "src/app/service/user.service";
import { TicketService } from "src/app/service/ticket.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }

      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
      img {
        transition: opacity 0.2s ease-in-out;
        cursor: pointer;
      }

      img:hover,
      img:active {
        cursor: grabbing;
        opacity: 0.5;
      }

      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  valCheck: string[] = ["remember"];

  config: AppConfig;

  subscription: Subscription;

  loginWithPhoneForm: any;

  loginWithEmailForm: any;

  dialCode: string;

  loginWithUsernameForm: any;

  activeIndex = 0;

  returnUrl: any;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private alertifyService: AlertifyService,
    private dialogService: DialogService,
    private localStorageService: LocalStorageServiceEncrypt,
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.localStorageService.remove("currentUser");
    this.loginWithPhoneForm = new FormGroup({
      phoneNumber: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      // recaptcha: new FormControl("", Validators.required),
    });
    this.ticketService.activePage = "login";

    this.loginWithEmailForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      ]),
      password: new FormControl("", Validators.required),
      // recaptcha: new FormControl("", Validators.required),
    });

    this.loginWithUsernameForm = new FormGroup({
      username: new FormControl("", Validators.required),

      password: new FormControl("", Validators.required),
      // recaptcha: new FormControl("", Validators.required),
    });
  }

  onCountryChange(event) {
    this.dialCode = event.dialCode;
  }
  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  EmptyInfoControl() {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));

    if (currentUser.kullaniciTipi !== "STANDART") {
      return;
    } else {
      this.userService.getById(currentUser.id).subscribe(
        (res) => {
          currentUser = res;

          if (
            currentUser.username === "" ||
            currentUser.email === "" ||
            currentUser.telefonNo === ""
          ) {
            this.router.navigateByUrl("profil");
            this.alertifyService.info(
              "Lütfen kişisel bilgilerinizi güncelleyiniz"
            );
          }
        },
        (error) => {}
      );
    }
  }

  loginWithEmail(): void {
    this.authService
      .loginWithEmail(
        this.loginWithEmailForm.value.email,
        this.loginWithEmailForm.value.password
      )
      .subscribe(
        (response) => {
          if (response) {
            const currentUser = JSON.parse(
              this.localStorageService.get("currentUser")
            );

            this.EmptyInfoControl();
            this.route.queryParams.subscribe((params) => {
              this.returnUrl = params["returnUrl"];
              if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.router.navigateByUrl("/");

                //   currentUser.kullaniciTipi == "PANEL_SORUMLUSU" ||
                //   currentUser.kullaniciTipi == "ADMIN"
                // ) {
                //   this.router.navigateByUrl("basvurular");
                // } else {
                //   this.router.navigateByUrl("dashboard");
                // }
              }
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.alertifyService.error("Hatalı mail ya da parola");
        }
      );
  } // if (currentUser.kullaniciTipi == "HAKEM") {
  //   this.router.navigateByUrl("hakem-basvurular");
  // } else if (

  loginWithUsername(): void {
    this.authService
      .loginWithUsername(
        this.loginWithUsernameForm.value.username,
        this.loginWithUsernameForm.value.password
      )
      .subscribe(
        (response) => {
          if (response) {
            const currentUser = JSON.parse(
              this.localStorageService.get("currentUser")
            );

            this.EmptyInfoControl();
            this.route.queryParams.subscribe((params) => {
              this.returnUrl = params["returnUrl"];
              if (this.returnUrl) {
                this.router.navigateByUrl(this.returnUrl);
              } else {
                this.router.navigateByUrl("/");

                //   currentUser.kullaniciTipi == "PANEL_SORUMLUSU" ||
                //   currentUser.kullaniciTipi == "ADMIN"
                // ) {
                //   this.router.navigateByUrl("basvurular");
                // } else {
                //   this.router.navigateByUrl("dashboard");
                // }
              }
            });
          }
        },
        (error: HttpErrorResponse) => {
          this.alertifyService.error("Hatalı mail ya da parola");
        }
      );
  } // if (cur
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showResponse(event) {}
}
