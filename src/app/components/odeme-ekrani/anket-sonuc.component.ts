import { Component, OnInit, Optional } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TicketService } from "src/app/service/ticket.service";
import { AlertifyService } from "src/app/service/alertify.service";
import { share } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { SurveySchemaService } from "src/app/service/survey-schema.service";
import { MAINPATH } from "src/environments/environment.prod";

@Component({
  selector: "app-sonuc-ekrani",
  templateUrl: "./anket-sonuc.component.html",
  styleUrls: ["./anket-sonuc.component.scss"],
})
export class AnketSonucComponent implements OnInit {
  path: any = MAINPATH;
  link: string = MAINPATH + "/#";
  shareCode: String;
  id: string = "";

  constructor(
    public alertifService: AlertifyService,
    private route: ActivatedRoute,
    public ticketService: TicketService,
    public router: Router,
    @Optional() public config: DynamicDialogConfig,
    public surveySchemaService: SurveySchemaService
  ) {}

  ngOnInit(): void {
    // if (
    //   this.ticketService.activePage !== "final" &&
    //   this.ticketService.activePage !== "anketlerim"
    // ) {
    //   this.router.navigateByUrl("/");
    // }
    if (this.config) {
      this.id = this.config.data.surveyId;
    }

    if (this.id === "" || !this.id) {
      let id = this.ticketService.surveyInfo.surveySchema.id;
      this.link += "/survey/" + id;
    } else {
      this.surveySchemaService.getById(this.id).subscribe((data) => {
        this.ticketService.surveyInfo.surveySchema = data;
        this.ticketService.surveyInfo.surveySchema.shareCode = data.shareCode;
        this.link += "/survey/" + this.id;
      });
    }
  }
  share() {
    let url = `${this.link}`;
    let text = "";
    if (this.ticketService.surveyInfo.surveySchema.ankettipi === "OZEL") {
      text = `🗳️ Senin için Dijital Sandık üzerinden bir anket oluşturdum! Linke tıklayarak oluşturduğum ankete gidebilirsin: \n${url}\n\nAnket Paylaşım Kodu: \n${this.ticketService.surveyInfo.surveySchema.shareCode} \n\nCevaplarını sabırsızlıkla bekliyorum. 😇`;
    } else {
      text = `🗳️ Senin için Dijital Sandık üzerinden bir anket oluşturdum! Linke tıklayarak oluşturduğum ankete gidebilirsin: \n\n${url}\n\nCevaplarını sabırsızlıkla bekliyorum. 😇`;
    }

    if (navigator.share) {
      navigator
        .share({
          title: "Dijital Sandık",
          text: text,
          url: url,
        })
        .then(() => console.log("Paylaşım başarılı"))
        .catch((error) => console.log("Paylaşım hatası:", error));
    } else {
      navigator.clipboard.writeText(text);
    }

    // navigator.clipboard.writeText(
    //   '🗳️ Senin için Dijital Sandık üzerinden bir architect oluşturdum! Linke tıklayarak oluşturduğum ankete gidebilirsin: "http://' +
    //     this.link +
    //     '" Cevaplarını sabırsızlıkla bekliyorum. 😇'
    // );
    this.alertifService.success("Link Başarıyla Kopyalandı");
  }
}
