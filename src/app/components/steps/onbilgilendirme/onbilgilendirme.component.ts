import { Component, OnInit } from "@angular/core";
import { TicketService } from "src/app/service/ticket.service";
import { Router } from "@angular/router";
import { LoginComponent } from "../../auth/login/login.component";
import { SurveySchema } from "src/app/models/surveySchema.model";
import { NgxLoadingComponent } from "ngx-loading";
import { AnketTipi } from "src/app/models/enum/AnketTipi.enum";

const jsonCreator = {
  locale: "tr",
  logoPosition: "right",
  pages: [
    {
      name: "Sayfa1",
      elements: [
        {
          type: "text",
          name: "Soru 1",
        },
      ],
    },
  ],
};

@Component({
  providers: [LoginComponent],
  selector: "app-onbilgilendirme",
  templateUrl: "./onbilgilendirme.component.html",
  styleUrls: ["./onbilgilendirme.component.scss"],
})
export class OnBilgilendirmeComponent implements OnInit {
  checked: boolean = false;
  checked2: boolean = false;
  genelMi: boolean;
  ozelMi: boolean;
  survey: SurveySchema;
  loading: boolean = false;

  constructor(
    private router: Router,
    private ticketService: TicketService,
    private loginComponent: LoginComponent
  ) {
    this.loginComponent.EmptyInfoControl();
  }

  ngOnInit(): void {}

  navigateToNext() {
    this.ticketService.activePage = "onBilgilendirme";
    this.router.navigate(["/creator"]);
  }

  createSchema() {
    return new Promise((resolve) => {
      this.loading = true;
      setTimeout(() => {
        this.survey = new SurveySchema();
        this.ticketService.surveyInfo.surveySchema = this.survey;
        this.ticketService.surveyInfo.surveySchema.content = jsonCreator;
        if (this.ozelMi == true) {
          this.ticketService.surveyInfo.surveySchema.ankettipi =
            AnketTipi[AnketTipi.OZEL];
        } else if (this.genelMi == true) {
          this.ticketService.surveyInfo.surveySchema.ankettipi =
            AnketTipi[AnketTipi.GENEL];
        }
        this.router.navigate(["/anketOlustur/creator"]);
        resolve(true);
      }, 1000); // 1000 milisaniye = 1 saniye
    });
  }
  privateSurveyCreator() {
    this.ozelMi = true;
    Promise.all([this.createSchema()]).then(() => {
      this.loading = false;
    });
  }
  generalSurveyCreator() {
    this.genelMi = true;
    Promise.all([this.createSchema()]).then(() => {
      this.loading = false;
    });
  }
}
