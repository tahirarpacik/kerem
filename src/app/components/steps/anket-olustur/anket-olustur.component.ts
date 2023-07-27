import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertifyService } from "src/app/service/alertify.service";
import { TicketService } from "src/app/service/ticket.service";

@Component({
  selector: "app-architect-olustur",
  templateUrl: "./anket-olustur.component.html",
  styleUrls: ["./anket-olustur.component.scss"],
})
export class AnketOlusturComponent implements OnInit {
  json = {};
  constructor(
    private ticketService: TicketService,
    private alertifyService: AlertifyService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  navigateToNext() {
    if (window.localStorage.getItem("survey-json") == null) {
      this.alertifyService.error("Lütfen Anket Oluşturun.");
    } else {
      this.router.navigateByUrl("/anketOlustur/final");
    }
  }
}
