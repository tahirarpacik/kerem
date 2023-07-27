import { Component, OnDestroy, Renderer2, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AppConfig } from "src/app/models/appconfig";
import { AppComponent } from "src/app/app.component";
import { MenuItem } from "primeng/api";
import { TicketService } from "src/app/service/ticket.service";

@Component({
  selector: "app-main",
  templateUrl: "./steps.component.html",
})
export class StepsComponent implements OnDestroy, OnInit {
  items: MenuItem[];

  config: AppConfig;

  subscription: Subscription;

  subscription2: Subscription;

  constructor(public app: AppComponent, private ticketService: TicketService) {}

  ngOnInit() {
    this.items = [
      {
        label: "Anket Tipi",
        routerLink: "onBilgilendirme",
      },
      {
        label: "Anket Oluştur",
        routerLink: "creator",
      },

      {
        label: "Anket Ayarları",
        routerLink: "final",
      },

    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
