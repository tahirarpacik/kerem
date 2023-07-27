import { Component, OnInit } from "@angular/core";
import { TicketService } from "src/app/service/ticket.service";
import { AlertifyService } from "src/app/service/alertify.service";
import { Router } from "@angular/router";
import { SurveySchema } from "src/app/models/surveySchema.model";
import { SurveySchemaService } from "src/app/service/survey-schema.service";
import { LocalStorageServiceEncrypt } from "angular-2-local-storage-encrypt";
import { Kullanici } from "src/app/models/kullanici.model";
import { AuthenticationService } from "src/app/security/authentication.service";
import { CursorError } from "@angular/compiler/src/ml_parser/lexer";
import { MailService } from "src/app/service/mail.service";
import { KullaniciTipi } from "src/app/models/enum/kullaniciTipi.enum";

@Component({
  selector: "app-final",
  templateUrl: "./final.component.html",
  styleUrls: ["./final.component.scss"],
})
export class FinalComponent implements OnInit {
  checked: boolean = false;
  checked1: boolean = false;
  checked2: boolean = false;
  checked3: boolean = false;
  currentUser: any;
  survey: SurveySchema;
  loading: boolean = false;

  constructor(
    public alertifyService: AlertifyService,
    public ticketService: TicketService,
    public router: Router,
    public surveySchemaService: SurveySchemaService,
    private localStorageService: LocalStorageServiceEncrypt,
    private authService: AuthenticationService,
    private mailService: MailService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.localStorageService.get("currentUser"));
  }
  ngOnDestroy() {
    // this.ticketService.initialState();
  }
  mailDogrula() {
    this.checked2 = true;
  }
  kodKontrol() {}

  saveSurveytoDB() {
    this.loading = true;
    this.ticketService.activePage = "final";
    this.survey = new SurveySchema();
    this.survey.content = window.localStorage.getItem("survey-json");
    if (this.ticketService.surveyInfo.surveySchema === null) {
      this.router.navigateByUrl("/anketOlustur/onBilgilendirme");
    }
    this.survey.ankettipi =
      this.ticketService.surveyInfo.surveySchema.ankettipi;

    if (this.survey.ankettipi === "OZEL") {
      this.survey.shareCode = new String();
      this.ticketService.surveyInfo.surveySchema.shareCode =
        this.survey.shareCode = this._generateCode();
    }

    this.survey.sonuclari_goster = this.checked;
    if (this.currentUser.kullaniciTipi === "STANDART") {
      this.checked1 = false;
    }
    this.survey.phone_verification = this.checked1;
    this.survey.email_verification = this.checked2;
    this.survey.ip_verification = this.checked3;
    this.survey.surveyResultQuantity = 0;
    this.surveySchemaService.create(this.survey).subscribe((data) => {
      let currentUser = JSON.parse(this.localStorageService.get("currentUser"));

      this.alertifyService.success("Anket Başarılıyla Kaydedildi.");
      window.localStorage.removeItem("survey-json");
      this.ticketService.surveyInfo.surveySchema.id = data.id;
      this.mailService.anketOlustuMail(currentUser.email).subscribe({
        next: (data) => {
          setTimeout(() => {
            this.loading = false;
            this.router.navigateByUrl("/anketSonuc");
          }, 1500);
        },
        error: (e) => {
          this.alertifyService.error(e.message);
          setTimeout(() => {
            this.loading = false;
            this.router.navigateByUrl("/anketSonuc");
          }, 1500);
        },
      });
    });
  }

  _generateCode(): string {
    let code = "";

    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }

    return code;
  }
  userPermissControl() {
    let currentUser = JSON.parse(this.localStorageService.get("currentUser"));
    if (currentUser.kullaniciTipi === "STANDART") {
      this.alertifyService.info(
        "Bu hizmetimiz şu anda kullanılamamaktadır. Çok yakında kullanıcılara da açılacaktır."
      );
    }
  }
}
